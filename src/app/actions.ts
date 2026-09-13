"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { sendEnquiry } from "@/lib/email";

export interface FormState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
}

export const initialFormState: FormState = { status: "idle" };

/**
 * Very small in-memory limiter. It is per-process, so it resets on deploy and
 * does not coordinate across instances. That is deliberate: it exists to blunt
 * a script hammering the form, not as real abuse protection. If the site ever
 * runs more than one instance, move this to Redis or put Cloudflare in front.
 */
const hits = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

async function rateLimited(): Promise<boolean> {
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const optionalText = (max: number) => z.string().trim().max(max).optional();

const base = {
  name: z.string().trim().min(2, "Please tell us your name.").max(120),
  phone: z.string().trim().min(6, "Please include a phone number we can reach you on.").max(30),
  email: z.string().trim().email("That email address doesn't look right.").max(200),
  // Honeypot. Real people never fill this in; bots almost always do.
  company: z.string().max(0).optional(),
};

const enquirySchema = z.object({
  ...base,
  purpose: optionalText(120),
  vehicle: optionalText(160),
  message: optionalText(4000),
});

const insuranceSchema = z.object({
  ...base,
  insurer: optionalText(120),
  claim: optionalText(120),
  fault: optionalText(60),
  repairer: optionalText(2000),
});

function collectErrors(issues: { path: PropertyKey[]; message: string }[]) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of issues) {
    const key = String(issue.path[0]);
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return fieldErrors;
}

const TOO_MANY =
  "That's a few too many in a row. Give it a minute, or call us on 0422 571 499.";

export async function submitEnquiry(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = enquirySchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: collectErrors(parsed.error.issues),
    };
  }

  const d = parsed.data;

  // Honeypot tripped: pretend it worked so the bot doesn't retry.
  if (d.company) return { status: "success", message: "Thanks — we'll be in touch." };
  if (await rateLimited()) return { status: "error", message: TOO_MANY };

  const vehicle = d.vehicle ?? "";
  const first = d.name.split(" ")[0];

  const result = await sendEnquiry({
    heading: vehicle ? `Enquiry about ${vehicle}` : "Website enquiry",
    subject: vehicle ? `Enquiry — ${vehicle}` : `Website enquiry — ${d.name}`,
    replyTo: d.email,
    rows: [
      ["Name", d.name],
      ["Phone", d.phone],
      ["Email", d.email],
      ["Vehicle", vehicle],
      ["Needs it for", d.purpose ?? ""],
      ["Message", d.message ?? ""],
    ],
  });

  if (!result.ok) {
    return { status: "error", message: `${result.error} Please call us on 0422 571 499 instead.` };
  }

  return {
    status: "success",
    message: vehicle
      ? `Thanks ${first} — we'll call you about the ${vehicle} today.`
      : `Thanks ${first} — we'll be in touch today.`,
  };
}

export async function submitInsuranceRequest(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const parsed = insuranceSchema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: collectErrors(parsed.error.issues),
    };
  }

  const d = parsed.data;
  if (d.company) return { status: "success", message: "Thanks — we'll be in touch." };
  if (await rateLimited()) return { status: "error", message: TOO_MANY };

  const claim = d.claim ?? "";
  const result = await sendEnquiry({
    heading: "Insurance replacement request",
    subject: `Replacement vehicle — ${d.name}${claim ? ` (claim ${claim})` : ""}`,
    replyTo: d.email,
    rows: [
      ["Name", d.name],
      ["Phone", d.phone],
      ["Email", d.email],
      ["Insurer", d.insurer ?? ""],
      ["Claim number", claim],
      ["At fault?", d.fault ?? ""],
      ["Repairer / timeframe", d.repairer ?? ""],
    ],
  });

  if (!result.ok) {
    return { status: "error", message: `${result.error} Please call us on 0422 571 499 instead.` };
  }

  return {
    status: "success",
    message: `Thanks ${d.name.split(" ")[0]} — we'll check your entitlement with ${
      d.insurer || "your insurer"
    } and call you back today.`,
  };
}
