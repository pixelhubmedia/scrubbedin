import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  optional?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, hint, error, optional, className = "", id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
            {label}
            {optional && <span className="ml-1.5 text-xs font-normal text-slate-400">Optional</span>}
          </label>
        )}
        {hint && <p className="text-xs text-slate-500 -mt-0.5">{hint}</p>}
        <input
          ref={ref}
          id={inputId}
          className={[
            "w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            "disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed",
            error
              ? "border-red-400 bg-red-50 focus:ring-red-400"
              : "border-slate-300 bg-white hover:border-slate-400",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          {...props}
        />
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
