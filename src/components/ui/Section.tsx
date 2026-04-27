import { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "article";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padY?: "sm" | "md" | "lg" | "xl";
}

const maxWidths = {
  sm:   "max-w-xl",
  md:   "max-w-3xl",
  lg:   "max-w-5xl",
  xl:   "max-w-6xl",
  "2xl":"max-w-7xl",
  full: "max-w-none",
};

const padYs = {
  sm: "py-8",
  md: "py-12 md:py-16",
  lg: "py-16 md:py-24",
  xl: "py-20 md:py-32",
};

export default function Section({
  as: Tag = "section",
  maxWidth = "xl",
  padY = "lg",
  className = "",
  children,
  ...props
}: SectionProps) {
  return (
    <Tag className={`w-full px-4 sm:px-6 ${padYs[padY]} ${className}`} {...props}>
      <div className={`${maxWidths[maxWidth]} mx-auto`}>{children}</div>
    </Tag>
  );
}
