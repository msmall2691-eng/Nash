"use server";

import { headers } from "next/headers";

import { sendEstimateNotification } from "@/lib/email";
import { allowSubmission } from "@/lib/rate-limit";
import {
  contactSchema,
  isServedCity,
  toFieldErrors,
  type ContactFormState,
  type ContactInput,
} from "@/lib/validation";

/** Human-readable handle the visitor can quote when they call us. */
function buildReference(): string {
  const stamp = new Date();
  const year = stamp.getFullYear().toString().slice(-2);
  const day = String(Math.floor((stamp.getTime() - new Date(stamp.getFullYear(), 0, 0).getTime()) / 86_400_000)).padStart(3, "0");
  const noise = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `NC-${year}${day}-${noise}`;
}

/** Best-effort client identity for rate limiting behind a proxy/CDN. */
async function clientKey(): Promise<string> {
  const headerBag = await headers();
  const forwarded = headerBag.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || headerBag.get("x-real-ip") || "unknown";
}

function readString(form: FormData, key: string): string {
  const value = form.get(key);
  return typeof value === "string" ? value : "";
}

/**
 * Server Action backing `components/ContactForm.tsx`.
 *
 * Shaped for `useActionState`: takes the previous state, returns the next one.
 * It never throws and never redirects, so the client can render success and
 * validation feedback in place without a navigation.
 */
export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const submitted = {
    name: readString(formData, "name"),
    email: readString(formData, "email"),
    phone: readString(formData, "phone"),
    city: readString(formData, "city"),
    projectType: readString(formData, "projectType"),
    budget: readString(formData, "budget"),
    details: readString(formData, "details"),
    company: readString(formData, "company"),
  };

  // Honeypot: pretend it worked so bots do not learn to retry.
  if (submitted.company.length > 0) {
    return { status: "success", message: "Thanks — we'll be in touch.", errors: {}, reference: buildReference() };
  }

  const parsed = contactSchema.safeParse(submitted);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      errors: toFieldErrors(parsed.error.issues),
      values: submitted,
    };
  }

  const lead: ContactInput = parsed.data;

  if (!isServedCity(lead.city)) {
    return {
      status: "error",
      message: "We build across New Hampshire — pick the closest town to your site.",
      errors: { city: "Choose a town from the list." },
      values: submitted,
    };
  }

  if (!allowSubmission(await clientKey())) {
    return {
      status: "error",
      message: `Too many requests from this connection. Call us at (603) 555-0142 and we'll take it down by phone.`,
      errors: {},
      values: submitted,
    };
  }

  const reference = buildReference();
  const delivery = await sendEstimateNotification(lead, reference);

  if (!delivery.delivered && delivery.reason === "provider-error") {
    return {
      status: "error",
      message: "We couldn't deliver that just now. Please call (603) 555-0142 — we don't want to lose your project.",
      errors: {},
      values: submitted,
    };
  }

  return {
    status: "success",
    message: `Thanks, ${lead.name.split(" ")[0]} — your request is in.`,
    errors: {},
    reference,
  };
}
