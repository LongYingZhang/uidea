type FilterChipsProps = {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  ariaLabel?: string;
  className?: string;
};

/** Secondary switcher — same height / type as primary buttons */
export function FilterChips({
  options,
  value,
  onChange,
  ariaLabel,
  className = "mb-10",
}: FilterChipsProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={`${className} flex items-center gap-2 overflow-x-auto`}
    >
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt)}
            className={`ui-chip shrink-0 ${active ? "is-active" : ""}`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
