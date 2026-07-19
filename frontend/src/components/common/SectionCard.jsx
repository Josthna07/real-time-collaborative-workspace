function SectionCard({
  title,
  subtitle,
  action,
  children,
}) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">

      <div className="flex justify-between items-start mb-6">

        <div>

          {title && (
            <h2 className="text-2xl font-semibold text-slate-800">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="text-slate-500 mt-1">
              {subtitle}
            </p>
          )}

        </div>

        {action}

      </div>

      {children}

    </div>
  );
}

export default SectionCard;