import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  optional?: boolean;
  maxLength?: number;
  currentLength?: number;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, hint, error, optional, maxLength, currentLength, className = "", id, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <div className="flex justify-between items-baseline">
            <label htmlFor={textareaId} className="text-sm font-medium text-slate-700">
              {label}
              {optional && <span className="ml-1.5 text-xs font-normal text-slate-400">Optional</span>}
            </label>
            {maxLength !== undefined && currentLength !== undefined && (
              <span className={`text-xs ${currentLength > maxLength * 0.9 ? "text-amber-600" : "text-slate-400"}`}>
                {currentLength}/{maxLength}
              </span>
            )}
          </div>
        )}
        {hint && <p className="text-xs text-slate-500 -mt-0.5">{hint}</p>}
        <textarea
          ref={ref}
          id={textareaId}
          maxLength={maxLength}
          className={[
            "w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 resize-none",
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

Textarea.displayName = "Textarea";
export default Textarea;
