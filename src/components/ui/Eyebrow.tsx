import { cn } from "@/lib/utils";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  dark?: boolean;
}

export default function Eyebrow({ children, className, style, dark = false }: EyebrowProps) {
  return (
    <p
      className={cn(
        "eyebrow",
        dark ? "text-mint" : "text-primary",
        className
      )}
      style={style}
    >
      {children}
    </p>
  );
}
