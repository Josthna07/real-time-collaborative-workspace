function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  className = "",
}) {
  return (
    <div className="mb-5">
      {label && (
        <label className="block mb-2.5 font-semibold text-slate-700 dark:text-slate-300 text-sm">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`
          w-full
          border border-slate-300 dark:border-slate-600
          rounded-lg
          px-4
          py-2.5
          text-slate-900 dark:text-white
          bg-white dark:bg-slate-800
          placeholder-slate-500 dark:placeholder-slate-400
          outline-none
          transition-all duration-200
          focus:border-blue-500 dark:focus:border-blue-400
          focus:ring-2
          focus:ring-blue-500/20 dark:focus:ring-blue-400/20
          hover:border-slate-400 dark:hover:border-slate-500
          disabled:bg-slate-50 dark:disabled:bg-slate-700
          disabled:text-slate-500 dark:disabled:text-slate-400
          disabled:cursor-not-allowed
          ${className}
        `}
      />
    </div>
  );
}

export default Input;