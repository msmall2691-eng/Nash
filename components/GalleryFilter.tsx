"use client";

export type FilterOption<T extends string> = {
  value: T | "All";
  label: string;
  count: number;
};

type GalleryFilterProps<T extends string> = {
  /** Visible group label, also the accessible name of the button group. */
  label: string;
  options: FilterOption<T>[];
  value: T | "All";
  onChange: (value: T | "All") => void;
};

/**
 * Pill-shaped filter menu.
 *
 * A `radiogroup` rather than a `<select>`: every option stays visible and one
 * tap away, which is what a gallery filter should feel like on a phone.
 */
export function GalleryFilter<T extends string>({
  label,
  options,
  value,
  onChange,
}: GalleryFilterProps<T>) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-granite-500">
        {label}
      </span>
      <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = option.value === value;
          const disabled = option.count === 0;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              disabled={disabled}
              onClick={() => onChange(option.value)}
              className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-40 ${
                selected
                  ? "border-granite-900 bg-granite-900 text-granite-50 shadow-md shadow-granite-900/15"
                  : "border-granite-200 bg-white text-granite-600 hover:-translate-y-0.5 hover:border-granite-300 hover:text-granite-900 hover:shadow-sm"
              }`}
            >
              {option.label}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[11px] leading-none tabular-nums transition-colors duration-300 ${
                  selected ? "bg-brass-500 text-granite-950" : "bg-granite-100 text-granite-500"
                }`}
              >
                {option.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
