import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-900",
    secondary: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    outline: "border border-blue-700 text-blue-700 hover:bg-blue-50",
    ghost: "text-slate-600 hover:bg-slate-100",
  };

  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}
