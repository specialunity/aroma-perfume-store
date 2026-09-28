import { ArrowRight } from "lucide-react";

function Button({
  children,
  type = "button",
  variant = "primary",
  onClick,
  disabled = false,
  className = "",
  showArrow = false,
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary: "bg-[#d4af37] text-black hover:bg-[#f1d77a]",
    outline: "border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black",
    dark: "border border-white/15 bg-[#151515] text-white hover:border-[#d4af37] hover:text-[#d4af37]",
    ghost: "text-gray-300 hover:text-[#d4af37]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      {showArrow && (
        <ArrowRight
          size={15}
          strokeWidth={1.7}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </button>
  );
}

export default Button;