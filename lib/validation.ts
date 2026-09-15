import { z } from "zod";

import { nhCities } from "@/lib/site";

export const PROJECT_TYPES = [
  "Custom Home",
  "Whole-Home Remodel",
  "Kitchen & Bath",
  "Addition / Dormer",
  "Lakefront / Waterfront",
  "Light Commercial",
] as const;

export const BUDGET_BANDS = [
  "Under $75k",
  "$75k – $150k",
  "$150k – $350k",
  "$350k – $750k",
  "$750k – $1.5M",
  "$1.5M+",
  "Not sure yet",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];
export type BudgetBand = (typeof BUDGET_BANDS)[number];

/** Accepts the ways people actually type a phone number, then we normalize. */
const phonePattern = /^[\d\s().+-]{10,20}$/;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "That name is longer than we can store."),
  email: z.email("Enter a valid email address.").max(160),
  phone: z
    .string()
    .trim()
    .regex(phonePattern, "Enter a phone number we can reach you at.")
    .refine((value) => value.replace(/\D/g, "").length >= 10, {
      message: "Phone numbers need at least 10 digits.",
    }),
  city: z.string().trim().min(2, "Tell us which NH town the project is in."),
  projectType: z.enum(PROJECT_TYPES, { message: "Choose the type of project." }),
  budget: z.enum(BUDGET_BANDS, { message: "Choose a budget range." }),
  details: z.string().trim().max(2000, "Please keep the summary under 2000 characters.").optional(),
  /** Honeypot — real people never fill this, bots usually do. */
  company: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Field-keyed errors returned to the client for inline display. */
export type FieldErrors = Partial<Record<keyof ContactInput, string>>;

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: FieldErrors;
  /** Echoed back so the form can repopulate after a failed submit. */
  values?: Partial<Record<keyof ContactInput, string>>;
  /** Set on success — used by the UI for the confirmation copy. */
  reference?: string;
};

export const initialContactState: ContactFormState = {
  status: "idle",
  message: "",
  errors: {},
};

/**
 * Collapses a ZodError into one message per field.
 *
 * Built from `issues` directly rather than `flatten()` so the shape stays stable
 * across Zod majors.
 */
export function toFieldErrors(issues: z.core.$ZodIssue[]): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !(key in errors)) {
      errors[key as keyof ContactInput] = issue.message;
    }
  }
  return errors;
}

/** `(603) 555-0142` from whatever the visitor typed. */
export function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  if (digits.length !== 10) return raw.trim();
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** Guard against a select being posted with a town we do not serve. */
export function isServedCity(city: string): boolean {
  return nhCities.some((town) => town.toLowerCase() === city.trim().toLowerCase());
}
