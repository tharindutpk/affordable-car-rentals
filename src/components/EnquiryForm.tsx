"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { initialFormState, submitEnquiry } from "@/app/actions";
import { PURPOSES, site } from "@/lib/site";
import type { Vehicle } from "@/lib/types";

function Submit({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-primary" type="submit" disabled={pending}>
      {pending ? "Sending…" : label}
    </button>
  );
}

interface Props {
  /** When set, the form is locked to this car and says so in the email subject. */
  vehicle?: Vehicle;
  vehicles?: Vehicle[];
  heading?: string;
  submitLabel?: string;
}

export default function EnquiryForm({
  vehicle,
  vehicles,
  heading,
  submitLabel = "Send enquiry",
}: Props) {
  const [state, formAction] = useActionState(submitEnquiry, initialFormState);

  if (state.status === "success") {
    return (
      <div className="formcard">
        {heading ? <h2 style={{ fontSize: "1.4rem", marginBottom: "1rem" }}>{heading}</h2> : null}
        <p className="alert alert-ok" role="status">{state.message}</p>
        <p style={{ marginTop: "1.2rem", fontSize: ".95rem", color: "var(--muted)" }}>
          If it&apos;s urgent, calling is faster:{" "}
          <a href={site.phoneHref}>{site.phone}</a>.
        </p>
      </div>
    );
  }

  const err = state.fieldErrors ?? {};

  return (
    <div className="formcard">
      {heading ? <h2 style={{ fontSize: "1.4rem", marginBottom: "1.2rem" }}>{heading}</h2> : null}

      <form className="form" action={formAction} noValidate>
        {state.status === "error" && state.message ? (
          <p className="alert alert-bad" role="alert">{state.message}</p>
        ) : null}

        <div className="row">
          <div>
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" type="text" autoComplete="name"
              placeholder="Full name" required
              aria-invalid={err.name ? "true" : undefined} />
            {err.name ? <p className="err">{err.name}</p> : null}
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" autoComplete="tel"
              inputMode="tel" placeholder="04.." required
              aria-invalid={err.phone ? "true" : undefined} />
            {err.phone ? <p className="err">{err.phone}</p> : null}
          </div>
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email"
            inputMode="email" placeholder="you@example.com" required
            aria-invalid={err.email ? "true" : undefined} />
          {err.email ? <p className="err">{err.email}</p> : null}
        </div>

        <div>
          <label htmlFor="purpose">What do you need the car for?</label>
          <select id="purpose" name="purpose" defaultValue={PURPOSES[0]}>
            {PURPOSES.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>

        {vehicle ? (
          // Locked to this car. Without this the enquiry arrives saying
          // "I'm interested in a car" and someone has to ring back to find
          // out which one.
          <input type="hidden" name="vehicle" value={`${vehicle.year} ${vehicle.title}`} />
        ) : vehicles && vehicles.length ? (
          <div>
            <label htmlFor="vehicle">Which car are you interested in?</label>
            <select id="vehicle" name="vehicle" defaultValue="">
              <option value="">Not sure yet — recommend one</option>
              {vehicles.map((v) => (
                <option key={v.slug} value={`${v.year} ${v.title}`}>
                  {v.year} {v.title} — ${v.weeklyRate}/wk
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div>
          <label htmlFor="message">Anything else we should know?</label>
          <textarea id="message" name="message"
            placeholder="When you need it, how long for, any questions" />
        </div>

        {/* Honeypot. Hidden off-screen rather than display:none so bots fill it. */}
        <div className="hp" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <Submit label={submitLabel} />
        <p className="hint">
          We reply the same business day. Enquiries go to {site.email}.
        </p>
      </form>
    </div>
  );
}
