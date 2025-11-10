import { Loader2 } from "lucide-react";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  loading = false,
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition px-5 py-2 focus:outline-none";

  const variants = {
    primary: "bg-green-700 text-white hover:bg-green-800",
    outline: "border border-green-700 text-green-700 hover:bg-green-700 hover:text-white",
    ghost: "text-green-700 hover:bg-green-50",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
}
