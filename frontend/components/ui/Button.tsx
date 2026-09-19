import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "whatsapp";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: ButtonVariant;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

// Matches .btn-action.primary / .secondary / .wa from main.css
const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-daltar-accent-blue text-daltar-bg-deep hover:bg-daltar-accent-blue-hover",
  secondary: "border border-daltar-border text-daltar-text-bright hover:bg-white/5",
  whatsapp: "bg-daltar-whatsapp text-white hover:bg-daltar-whatsapp-hover"
};

export default function Button({
  children,
  href,
  variant = "primary",
  external = false,
  onClick,
  type = "button",
  className = ""
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-[13px] font-semibold transition ${VARIANT_CLASSES[variant]} ${className}`;

  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={classes}>
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
