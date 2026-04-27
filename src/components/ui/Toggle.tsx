"use client";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  disabled?: boolean;
}

export default function Toggle({ checked, onChange, label, description, disabled }: ToggleProps) {
  return (
    <label className={`flex items-start gap-3 cursor-pointer ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
      <div className="relative mt-0.5 flex-shrink-0">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => !disabled && onChange(e.target.checked)}
          disabled={disabled}
        />
        <div
          className={`w-11 h-6 rounded-full transition-colors duration-200 ${
            checked ? "bg-blue-600" : "bg-slate-300"
          }`}
        />
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800">{label}</p>
        {description && <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{description}</p>}
      </div>
    </label>
  );
}
