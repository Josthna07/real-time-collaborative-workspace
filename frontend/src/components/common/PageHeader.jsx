function PageHeader({
  title,
  subtitle,
  action,
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">

      <div>

        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-3 text-lg text-slate-500 max-w-2xl leading-8">
            {subtitle}
          </p>
        )}

      </div>

      {action}

    </div>
  );
}

export default PageHeader;