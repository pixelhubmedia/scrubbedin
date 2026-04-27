import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, hint, error, optional, options, placeholder, className = "", id, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-sm font-medium text-slate-700">
            {label}
            {optional && <span className="ml-1.5 text-xs font-normal text-slate-400">Optional</span>}
          </label>
        )}
        {hint && <p className="text-xs text-slate-500 -mt-0.5">{hint}</p>}
        <select
          ref={ref}
          id={selectId}
          className={[
            "w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 bg-white",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            "disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed",
            error
              ? "border-red-400 bg-red-50 focus:ring-red-400"
              : "border-slate-300 hover:border-slate-400",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;
