import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
}

export default function Card({ padding = "md", className = "", children, ...props }: CardProps) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`bg-white border border-slate-200 rounded-xl shadow-sm ${paddings[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
