function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-700 dark:to-violet-700 px-6 py-3 text-white font-semibold shadow-lg dark:shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:hover:shadow-2xl disabled:opacity-50 dark:disabled:from-indigo-900 dark:disabled:to-violet-900 ${className}`}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;