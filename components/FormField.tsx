"use client";

import { useId } from "react";

type BaseProps = {
  label: string;
  name: string;
  error?: string | undefined;
  hint?: string;
  required?: boolean;
  defaultValue?: string | undefined;
};

const controlClass = (invalid: boolean) =>
  `w-full rounded-lg border bg-white px-4 py-3 text-[15px] text-granite-900 shadow-sm outline-none transition-all duration-200 placeholder:text-granite-400 ${
    invalid
      ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
      : "border-granite-200 hover:border-granite-300 focus:border-brand-700 focus:ring-4 focus:ring-brand-700/10"
  }`;

function Shell({
  label,
  hint,
  error,
  required,
  fieldId,
  errorId,
  children,
}: BaseProps & { fieldId: string; errorId: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={fieldId} className="text-sm font-medium text-granite-700">
        {label}
        {required && <span className="ml-0.5 text-brand-700">*</span>}
      </label>
      {children}
      {error ? (
        <p id={errorId} role="alert" className="animate-fade-in text-xs font-medium text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-granite-500">{hint}</p>
      ) : null}
    </div>
  );
}

export function TextField({
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
  ...props
}: BaseProps & {
  type?: "text" | "email" | "tel";
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel";
}) {
  const fieldId = useId();
  const errorId = `${fieldId}-error`;
  const invalid = Boolean(props.error);

  return (
    <Shell {...props} fieldId={fieldId} errorId={errorId}>
      <input
        id={fieldId}
        name={props.name}
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={props.required}
        defaultValue={props.defaultValue}
        aria-invalid={invalid}
        aria-describedby={invalid ? errorId : undefined}
        className={controlClass(invalid)}
      />
    </Shell>
  );
}

export function SelectField({
  options,
  placeholder = "Select…",
  ...props
}: BaseProps & { options: readonly string[]; placeholder?: string }) {
  const fieldId = useId();
  const errorId = `${fieldId}-error`;
  const invalid = Boolean(props.error);

  return (
    <Shell {...props} fieldId={fieldId} errorId={errorId}>
      <div className="relative">
        <select
          id={fieldId}
          name={props.name}
          required={props.required}
          defaultValue={props.defaultValue ?? ""}
          aria-invalid={invalid}
          aria-describedby={invalid ? errorId : undefined}
          className={`${controlClass(invalid)} cursor-pointer appearance-none pr-10`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-granite-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
        >
          <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Shell>
  );
}

export function TextAreaField({
  rows = 4,
  placeholder,
  ...props
}: BaseProps & { rows?: number; placeholder?: string }) {
  const fieldId = useId();
  const errorId = `${fieldId}-error`;
  const invalid = Boolean(props.error);

  return (
    <Shell {...props} fieldId={fieldId} errorId={errorId}>
      <textarea
        id={fieldId}
        name={props.name}
        rows={rows}
        placeholder={placeholder}
        defaultValue={props.defaultValue}
        aria-invalid={invalid}
        aria-describedby={invalid ? errorId : undefined}
        className={`${controlClass(invalid)} resize-y`}
      />
    </Shell>
  );
}
