"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import { submitContactForm } from "@/app/actions/contact";
import { SelectField, TextAreaField, TextField } from "@/components/FormField";
import { nhCities, site } from "@/lib/site";
import { BUDGET_BANDS, PROJECT_TYPES, initialContactState } from "@/lib/validation";

/**
 * Lives inside <form> so `useFormStatus` can read the parent form's pending
 * state — the hook only reports on an ancestor form, never a sibling.
 */
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="group relative w-full overflow-hidden rounded-full bg-granite-900 px-8 py-4 text-sm font-medium text-granite-50 transition-all duration-300 hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-700/25 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:bg-granite-900 disabled:hover:shadow-none sm:w-auto"
    >
      <span className={`flex items-center justify-center gap-2.5 transition-opacity duration-200 ${pending ? "opacity-0" : "opacity-100"}`}>
        Request a Consultation
        <svg viewBox="0 0 20 20" className="size-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={1.75} aria-hidden="true">
          <path d="M4 10h12M11 5l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className={`absolute inset-0 flex items-center justify-center gap-2.5 transition-opacity duration-200 ${pending ? "opacity-100" : "opacity-0"}`}>
        <svg viewBox="0 0 24 24" className="size-4 animate-spin" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={2.5} className="opacity-25" />
          <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
        </svg>
        Sending…
      </span>
    </button>
  );
}

/** Animated confirmation panel — replaces the form in place, no navigation. */
function SuccessPanel({
  message,
  reference,
  onReset,
}: {
  message: string;
  reference: string | undefined;
  onReset: () => void;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-scale-in flex flex-col items-center rounded-2xl border border-granite-200 bg-gradient-to-b from-white to-brand-600/5 px-8 py-14 text-center shadow-sm"
    >
      <div className="relative grid size-16 place-items-center rounded-full bg-brand-700">
        <span className="absolute inset-0 animate-ring rounded-full bg-brand-700" aria-hidden="true" />
        <svg viewBox="0 0 24 24" className="relative size-8" fill="none" stroke="white" strokeWidth={2.5} aria-hidden="true">
          <path
            d="M5 12.5l4.5 4.5L19 7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            // Stroke is drawn on rather than popped in — 32 covers the path length.
            className="animate-check [stroke-dasharray:32] [stroke-dashoffset:32]"
          />
        </svg>
      </div>

      <h3 className="animate-fade-up mt-7 font-display text-2xl font-semibold text-granite-900 [animation-delay:120ms]">
        {message}
      </h3>
      <p className="animate-fade-up mt-3 max-w-md text-[15px] leading-relaxed text-granite-600 [animation-delay:200ms]">
        A project manager reads every request personally. Expect a call from{" "}
        <span className="whitespace-nowrap font-medium text-granite-800">{site.phoneDisplay}</span> within
        one business day.
      </p>

      {reference && (
        <p className="animate-fade-up mt-6 rounded-full border border-granite-200 bg-white px-4 py-2 text-xs uppercase tracking-[0.16em] text-granite-500 [animation-delay:280ms]">
          Reference {reference}
        </p>
      )}

      <button
        type="button"
        onClick={onReset}
        className="animate-fade-up mt-8 text-sm font-medium text-granite-500 underline-offset-4 transition-colors hover:text-brand-600 hover:underline [animation-delay:360ms]"
      >
        Send another request
      </button>
    </div>
  );
}

function ContactFormInner({ onReset }: { onReset: () => void }) {
  const [state, formAction] = useActionState(submitContactForm, initialContactState);
  const formRef = useRef<HTMLFormElement>(null);

  // Clear the inputs once a submission lands, so "Submit another" starts clean.
  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <SuccessPanel
        message={state.message}
        reference={state.reference}
        onReset={onReset}
      />
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      noValidate
      className="animate-fade-in rounded-2xl border border-granite-200 bg-white p-6 shadow-sm sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Name"
          name="name"
          required
          autoComplete="name"
          placeholder="Chris Lambert"
          error={state.errors.name}
          defaultValue={state.values?.name}
        />
        <TextField
          label="Company / Organization"
          name="company"
          autoComplete="organization"
          placeholder="Acme Manufacturing"
          hint="Optional, but it's the first thing a PM asks."
          error={state.errors.company}
          defaultValue={state.values?.company}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          inputMode="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          error={state.errors.email}
          defaultValue={state.values?.email}
        />
        <TextField
          label="Phone"
          name="phone"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          placeholder="(603) 555-0142"
          error={state.errors.phone}
          defaultValue={state.values?.phone}
        />
        <SelectField
          label="Project Town"
          name="city"
          required
          options={nhCities}
          placeholder="Where is the building?"
          error={state.errors.city}
          defaultValue={state.values?.city}
        />
        <SelectField
          label="Project Type"
          name="projectType"
          required
          options={PROJECT_TYPES}
          placeholder="What kind of work?"
          error={state.errors.projectType}
          defaultValue={state.values?.projectType}
        />
        <SelectField
          label="Budget"
          name="budget"
          required
          options={BUDGET_BANDS}
          placeholder="Select a range"
          hint="A range is enough — it shapes the scope conversation."
          error={state.errors.budget}
          defaultValue={state.values?.budget}
        />
      </div>

      <div className="mt-5">
        <TextAreaField
          label="Project details"
          name="details"
          rows={4}
          placeholder="Square footage, target dates, whether the space stays occupied during the work…"
          error={state.errors.details}
          defaultValue={state.values?.details}
        />
      </div>

      {/* Honeypot — hidden from people and assistive tech, irresistible to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="animate-fade-in mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.message}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton />
        <p className="text-xs leading-relaxed text-granite-500 sm:max-w-[16rem] sm:text-right">
          No obligation. We reply to every request within one business day.
        </p>
      </div>
    </form>
  );
}

export function ContactForm() {
  // Bumping the key remounts the inner form, which is the only way to reset
  // `useActionState` back to its initial state — and it costs no navigation.
  const [instance, setInstance] = useState(0);

  return <ContactFormInner key={instance} onReset={() => setInstance((n) => n + 1)} />;
}
