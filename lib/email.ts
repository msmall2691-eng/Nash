/**
 * Transactional email delivery for estimate requests.
 *
 * Wraps Resend behind a narrow interface so the server action never has to care
 * whether a provider is configured. With no `RESEND_API_KEY` present — local dev,
 * CI, preview builds — this degrades to a logged no-op rather than throwing, so
 * the form stays exercisable end to end without credentials.
 */

import { Resend } from "resend";

import { site } from "@/lib/site";
import { normalizePhone, type ContactInput } from "@/lib/validation";

export type DeliveryResult =
  | { delivered: true; id: string }
  | { delivered: false; reason: "not-configured" | "provider-error"; detail?: string };

const apiKey = process.env.RESEND_API_KEY;
const fromAddress = process.env.CONTACT_FROM_EMAIL ?? `Nash Construction <onboarding@resend.dev>`;
const toAddress = process.env.CONTACT_TO_EMAIL ?? site.email;

/** Instantiated once per server instance; `null` until a key exists. */
const resend = apiKey ? new Resend(apiKey) : null;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderNotification(lead: ContactInput, reference: string): string {
  const rows: Array<[string, string]> = [
    ["Reference", reference],
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", normalizePhone(lead.phone)],
    ["NH Town", lead.city],
    ["Project Type", lead.projectType],
    ["Budget", lead.budget],
    ["Details", lead.details?.trim() || "—"],
  ];

  return `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;color:#1c1917;max-width:560px">
      <h2 style="margin:0 0 4px;font-size:18px">New estimate request</h2>
      <p style="margin:0 0 16px;color:#78716c;font-size:13px">via nashconstructionnh.com</p>
      <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px 12px 8px 0;color:#78716c;vertical-align:top;white-space:nowrap">${label}</td>
            <td style="padding:8px 0;border-bottom:1px solid #e7e5e4">${escapeHtml(value)}</td>
          </tr>`,
          )
          .join("")}
      </table>
    </div>
  `;
}

/**
 * Sends the internal notification for a validated lead.
 *
 * Never throws — the caller decides what the visitor sees, and a provider outage
 * should not lose a lead behind a generic error screen.
 */
export async function sendEstimateNotification(
  lead: ContactInput,
  reference: string,
): Promise<DeliveryResult> {
  if (!resend) {
    console.info(
      `[contact] RESEND_API_KEY not set — estimate request ${reference} logged instead of emailed.`,
      { name: lead.name, email: lead.email, town: lead.city, projectType: lead.projectType },
    );
    return { delivered: false, reason: "not-configured" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: [toAddress],
      replyTo: lead.email,
      subject: `[${reference}] ${lead.projectType} — ${lead.city}, NH (${lead.budget})`,
      html: renderNotification(lead, reference),
    });

    if (error) {
      console.error(`[contact] Resend rejected ${reference}:`, error.message);
      return { delivered: false, reason: "provider-error", detail: error.message };
    }

    return { delivered: true, id: data?.id ?? reference };
  } catch (cause) {
    console.error(`[contact] Resend threw for ${reference}:`, cause);
    return {
      delivered: false,
      reason: "provider-error",
      detail: cause instanceof Error ? cause.message : "unknown",
    };
  }
}
