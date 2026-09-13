"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { initialFormState, submitInsuranceRequest } from "@/app/actions";
import { site } from "@/lib/site";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-primary" type="submit" disabled={pending}>
      {pending ? "Sending…" : "Send request"}
    </button>
  );
}

export default function InsuranceForm() {
  const [state, formAction] = useActionState(submitInsuranceRequest, initialFormState);

  if (state.status === "success") {
    return (
      <div className="formcard">
        <p className="alert alert-ok" role="status">{state.message}</p>
        <p style={{ marginTop: "1.2rem", fontSize: ".95rem", color: "var(--muted)" }}>
          If the repairer needs an answer today, call us on{" "}
          <a href={site.phoneHref}>{site.phone}</a>.
        </p>
      </div>
    );
  }

  const err = state.fieldErrors ?? {};

  return (
    <div className="formcard">
      <form className="form" action={formAction} noValidate>
        {state.status === "error" && state.message ? (
          <p className="alert alert-bad" role="alert">{state.message}</p>
        ) : null}

        <div className="row">
          <div>
            <label htmlFor="i-name">Your name</label>
            <input id="i-name" name="name" type="text" autoComplete="name"
              placeholder="Full name" required
              aria-invalid={err.name ? "true" : undefined} />
            {err.name ? <p className="err">{err.name}</p> : null}
          </div>
          <div>
            <label htmlFor="i-phone">Phone</label>
            <input id="i-phone" name="phone" type="tel" autoComplete="tel"
              inputMode="tel" placeholder="04.." required
              aria-invalid={err.phone ? "true" : undefined} />
            {err.phone ? <p className="err">{err.phone}</p> : null}
          </div>
        </div>

        <div>
          <label htmlFor="i-email">Email</label>
          <input id="i-email" name="email" type="email" autoComplete="email"
            placeholder="you@example.com" required
            aria-invalid={err.email ? "true" : undefined} />
          {err.email ? <p className="err">{err.email}</p> : null}
        </div>

        <div className="row">
          <div>
            <label htmlFor="i-insurer">Insurer</label>
            <input id="i-insurer" name="insurer" type="text" placeholder="e.g. NRMA, AAMI" />
          </div>
          <div>
            <label htmlFor="i-claim">Claim number</label>
            <input id="i-claim" name="claim" type="text" placeholder="If you have it" />
          </div>
        </div>

        <div>
          <label htmlFor="i-fault">Were you at fault?</label>
          <select id="i-fault" name="fault" defaultValue="Not at fault">
            <option>Not at fault</option>
            <option>At fault</option>
            <option>Not yet determined</option>
          </select>
        </div>

        <div>
          <label htmlFor="i-repairer">Repairer and expected repair time</label>
          <textarea id="i-repairer" name="repairer"
            placeholder="Which smash repairer has the car, and how long they've said it will take" />
        </div>

        <div className="hp" aria-hidden="true">
          <label htmlFor="i-company">Company</label>
          <input id="i-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <Submit />
        <p className="hint">
          We&apos;ll only use these details to arrange your replacement vehicle.
        </p>
      </form>
    </div>
  );
}
