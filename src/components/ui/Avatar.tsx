interface AvatarProps {
  name: string;
  photoUrl?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-lg",
  xl: "w-20 h-20 text-2xl",
};

function getInitials(name: string): string {
  return name
    .replace(/^(dr|mr|mrs|ms|prof)\s+/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

// Deterministic colour from name
const BG_COLOURS = [
  "bg-blue-600",
  "bg-indigo-600",
  "bg-violet-600",
  "bg-teal-600",
  "bg-sky-600",
  "bg-cyan-700",
];

function colourFor(name: string): string {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) | 0;
  return BG_COLOURS[Math.abs(h) % BG_COLOURS.length];
}

export default function Avatar({ name, photoUrl, size = "md", className = "" }: AvatarProps) {
  if (photoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photoUrl}
        alt={name}
        className={`${sizes[size]} rounded-full object-cover flex-shrink-0 ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizes[size]} ${colourFor(name)} rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 ${className}`}
      aria-label={name}
    >
      {getInitials(name)}
    </div>
  );
}
