function Card({ children, className = "", interactive = false }) {
  return (
    <div
      className={`
        bg-white dark:bg-slate-800
        rounded-xl
        shadow-md dark:shadow-lg
        hover:shadow-lg dark:hover:shadow-xl
        border border-slate-100 dark:border-slate-700
        p-6
        transition-all duration-200
        ${interactive ? "hover:border-blue-300 dark:hover:border-blue-500 cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;