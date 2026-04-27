import { HTMLAttributes } from "react";

type BadgeVariant = "blue" | "green" | "amber" | "red" | "slate" | "indigo";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, string> = {
  blue:   "bg-blue-100 text-blue-700 border-blue-200",
  green:  "bg-green-100 text-green-700 border-green-200",
  amber:  "bg-amber-100 text-amber-700 border-amber-200",
  red:    "bg-red-100 text-red-700 border-red-200",
  slate:  "bg-slate-100 text-slate-600 border-slate-200",
  indigo: "bg-indigo-100 text-indigo-700 border-indigo-200",
};

const dotStyles: Record<BadgeVariant, string> = {
  blue:   "bg-blue-400",
  green:  "bg-green-500",
  amber:  "bg-amber-400",
  red:    "bg-red-400",
  slate:  "bg-slate-400",
  indigo: "bg-indigo-400",
};

export default function Badge({
  variant = "blue",
  dot = false,
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full border ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotStyles[variant]}`} />}
      {children}
    </span>
  );
}
