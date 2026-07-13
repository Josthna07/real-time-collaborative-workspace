function Button({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
  variant = "primary",
  size = "md",
}) {
  const baseStyles = "font-semibold transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white focus:ring-blue-500 disabled:bg-blue-400 dark:disabled:bg-blue-900",
    secondary: "bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white focus:ring-slate-400 dark:focus:ring-slate-600 disabled:bg-slate-100 dark:disabled:bg-slate-800",
    danger: "bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 text-white focus:ring-red-500 disabled:bg-red-400 dark:disabled:bg-red-900",
    success: "bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white focus:ring-green-500 disabled:bg-green-400 dark:disabled:bg-green-900",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg w-full",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;
