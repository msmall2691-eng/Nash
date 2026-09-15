"use client";

import Link from "next/link";
import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";

import { submitContactForm } from "@/app/actions/contact";
import { SelectField, TextField } from "@/components/FormField";
import { nhCities } from "@/lib/site";
import { PROJECT_TYPES, initialContactState, type BudgetBand, type ProjectType } from "@/lib/validation";

/**
 * Ballpark all-in cost per finished square foot, in dollars.
 *
 * Indicative NH 2025 ranges for planning conversations only — never a quote.
 */
const BASE_RATES: Record<ProjectType, [number, number]> = {
  "Custom Home": [310, 470],
  "Whole-Home Remodel": [240, 390],
  "Kitchen & Bath": [420, 700],
  "Addition / Dormer": [290, 440],
  "Lakefront / Waterfront": [380, 620],
  "Light Commercial": [200, 330],
};

const FINISH_LEVELS = [
  { id: "considered", label: "Considered", blurb: "Clean, durable, builder-plus", factor: 0.9 },
  { id: "elevated", label: "Elevated", blurb: "Custom millwork, stone, tile", factor: 1.0 },
  { id: "heirloom", label: "Heirloom", blurb: "Bespoke throughout, no compromises", factor: 1.28 },
] as const;

type FinishId = (typeof FINISH_LEVELS)[number]["id"];

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/** Snaps a midpoint estimate onto the budget bands the server action accepts. */
function bandFor(midpoint: number): BudgetBand {
  if (midpoint < 75_000) return "Under $75k";
  if (midpoint < 150_000) return "$75k – $150k";
  if (midpoint < 350_000) return "$150k – $350k";
  if (midpoint < 750_000) return "$350k – $750k";
  if (midpoint < 1_500_000) return "$750k – $1.5M";
  return "$1.5M+";
}

function EstimateButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="w-full rounded-full bg-brass-500 px-8 py-4 text-sm font-medium text-granite-950 transition-all duration-300 hover:bg-brass-400 hover:shadow-xl hover:shadow-brass-500/30 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
    >
      {pending ? "Sending…" : "Send this to a project manager"}
    </button>
  );
}

export function EstimatorForm() {
  const [projectType, setProjectType] = useState<ProjectType>("Custom Home");
  const [squareFeet, setSquareFeet] = useState(2800);
  const [finish, setFinish] = useState<FinishId>("elevated");
  const [state, formAction] = useActionState(submitContactForm, initialContactState);

  const estimate = useMemo(() => {
    const [low, high] = BASE_RATES[projectType];
    const factor = FINISH_LEVELS.find((level) => level.id === finish)?.factor ?? 1;
    const min = Math.round((low * squareFeet * factor) / 5000) * 5000;
    const max = Math.round((high * squareFeet * factor) / 5000) * 5000;
    return { min, max, band: bandFor((min + max) / 2) };
  }, [projectType, squareFeet, finish]);

  const finishLabel = FINISH_LEVELS.find((level) => level.id === finish)?.label ?? "";

  if (state.status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="animate-scale-in rounded-2xl border border-brass-300/60 bg-white px-8 py-14 text-center"
      >
        <h3 className="font-display text-2xl font-semibold text-granite-900">{state.message}</h3>
        <p className="mt-3 text-[15px] text-granite-600">
          Your estimate outline is on its way to a project manager.
          {state.reference && (
            <>
              {" "}
              Reference <span className="font-medium text-granite-800">{state.reference}</span>.
            </>
          )}
        </p>
        <Link
          href="/gallery"
          className="mt-8 inline-block rounded-full border border-granite-300 px-6 py-3 text-sm font-medium text-granite-700 transition-colors hover:border-granite-900 hover:text-granite-900"
        >
          Browse our NH projects
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="grid gap-8 lg:grid-cols-5">
      {/* ---------------- Live calculator ---------------- */}
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-granite-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-granite-500">
              Step 1 — Shape the project
            </span>
            <h3 className="font-display text-xl font-semibold text-granite-900">
              Ballpark it in thirty seconds
            </h3>
          </div>

          <fieldset className="mt-6">
            <legend className="text-sm font-medium text-granite-700">Project type</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {PROJECT_TYPES.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={projectType === option}
                  onClick={() => setProjectType(option)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    projectType === option
                      ? "border-granite-900 bg-granite-900 text-granite-50"
                      : "border-granite-200 text-granite-600 hover:-translate-y-0.5 hover:border-granite-300 hover:text-granite-900"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-8">
            <div className="flex items-baseline justify-between">
              <label htmlFor="sqft" className="text-sm font-medium text-granite-700">
                Approximate size
              </label>
              <span className="font-display text-lg font-semibold tabular-nums text-granite-900">
                {squareFeet.toLocaleString("en-US")} sq ft
              </span>
            </div>
            <input
              id="sqft"
              type="range"
              min={400}
              max={9000}
              step={100}
              value={squareFeet}
              onChange={(event) => setSquareFeet(Number(event.target.value))}
              className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-granite-200 accent-brass-500"
            />
            <div className="mt-2 flex justify-between text-xs text-granite-400">
              <span>400</span>
              <span>9,000</span>
            </div>
          </div>

          <fieldset className="mt-8">
            <legend className="text-sm font-medium text-granite-700">Level of finish</legend>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {FINISH_LEVELS.map((level) => (
                <button
                  key={level.id}
                  type="button"
                  aria-pressed={finish === level.id}
                  onClick={() => setFinish(level.id)}
                  className={`rounded-xl border p-4 text-left transition-all duration-300 ${
                    finish === level.id
                      ? "border-brass-500 bg-brass-300/10 shadow-sm"
                      : "border-granite-200 hover:border-granite-300"
                  }`}
                >
                  <span className="block text-sm font-medium text-granite-900">{level.label}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-granite-500">{level.blurb}</span>
                </button>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      {/* ---------------- Result + handoff ---------------- */}
      <div className="lg:col-span-2">
        <div className="sticky top-28 rounded-2xl bg-granite-950 p-6 text-granite-200 sm:p-8">
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-granite-500">
            Planning range
          </span>
          <p
            aria-live="polite"
            className="mt-3 font-display text-3xl font-semibold leading-tight text-granite-50 transition-all duration-500"
          >
            {usd.format(estimate.min)}
            <span className="mx-2 text-granite-600">–</span>
            {usd.format(estimate.max)}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-granite-400">
            {finishLabel} finish · {squareFeet.toLocaleString("en-US")} sq ft · {projectType}. Indicative
            only — site work, ledge, septic and shoreland permitting move this number.
          </p>

          <div className="mt-7 space-y-4 border-t border-granite-800 pt-7">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-granite-500">
              Step 2 — Where do we send it?
            </span>
            <div className="[&_label]:text-granite-300 [&_p]:text-granite-500">
              <div className="grid gap-4">
                <TextField
                  label="Name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Jordan Whitcomb"
                  error={state.errors.name}
                  defaultValue={state.values?.name}
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
                  label="NH City / Town"
                  name="city"
                  required
                  options={nhCities}
                  placeholder="Where is the project?"
                  error={state.errors.city}
                  defaultValue={state.values?.city}
                />
              </div>
            </div>
          </div>

          {/* Calculator state travels with the submission as plain form fields. */}
          <input type="hidden" name="projectType" value={projectType} />
          <input type="hidden" name="budget" value={estimate.band} />
          <input
            type="hidden"
            name="details"
            value={`Estimator: ${projectType} · ${squareFeet.toLocaleString("en-US")} sq ft · ${finishLabel} finish · planning range ${usd.format(estimate.min)}–${usd.format(estimate.max)}`}
          />
          <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
            <input name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          {state.status === "error" && state.message && (
            <p role="alert" className="animate-fade-in mt-5 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {state.message}
            </p>
          )}

          <div className="mt-7">
            <EstimateButton />
          </div>
        </div>
      </div>
    </form>
  );
}
