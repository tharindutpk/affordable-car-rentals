import { Resend } from "resend";
import { site } from "@/lib/site";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const TO = process.env.CONTACT_TO_EMAIL || "info@affordablecarrentals.com.au";
const FROM =
  process.env.CONTACT_FROM_EMAIL || "website@affordablecarrentals.com.au";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function table(rows: [string, string][]): string {
  const cells = rows
    .filter(([, v]) => v && v.trim())
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#5B6675;vertical-align:top;white-space:nowrap">${escapeHtml(
          k,
        )}</td><td style="padding:8px 0;color:#0B1231"><strong>${escapeHtml(
          v,
        ).replace(/\n/g, "<br>")}</strong></td></tr>`,
    )
    .join("");
  return `<table style="border-collapse:collapse;font-family:system-ui,sans-serif;font-size:15px">${cells}</table>`;
}

export interface MailPayload {
  subject: string;
  rows: [string, string][];
  replyTo?: string;
  heading: string;
}

export async function sendEnquiry({
  subject,
  rows,
  replyTo,
  heading,
}: MailPayload): Promise<{ ok: boolean; error?: string }> {
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:620px">
      <h2 style="color:#000868;font-size:19px;margin:0 0 4px">${escapeHtml(heading)}</h2>
      <p style="color:#5B6675;font-size:13px;margin:0 0 18px">
        Sent from ${escapeHtml(site.url)}
      </p>
      ${table(rows)}
    </div>`;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  // No API key configured (local dev, or a misconfigured deploy). Log it so
  // nothing is silently swallowed, and let the user see a success state only
  // in development.
  if (!resend) {
    console.warn("[email] RESEND_API_KEY is not set. Enquiry was NOT sent:\n" + text);
    return process.env.NODE_ENV === "development"
      ? { ok: true }
      : { ok: false, error: "Email is not configured on the server." };
  }

  try {
    const { error } = await resend.emails.send({
      from: `Affordable Car Rentals <${FROM}>`,
      to: [TO],
      subject,
      html,
      text,
      replyTo: replyTo || undefined,
    });
    if (error) {
      console.error("[email] resend error:", error);
      return { ok: false, error: "We couldn't send that just now." };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email] threw:", err);
    return { ok: false, error: "We couldn't send that just now." };
  }
}
