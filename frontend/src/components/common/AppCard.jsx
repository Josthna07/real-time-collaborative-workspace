function AppCard({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        bg-white
        rounded-3xl
        border border-slate-200
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        p-7
        overflow-hidden
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default AppCard;