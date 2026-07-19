function Badge({
  children,
  color = "blue",
}) {

  const colors = {

    blue:
      "bg-blue-100 text-blue-700",

    green:
      "bg-emerald-100 text-emerald-700",

    yellow:
      "bg-amber-100 text-amber-700",

    red:
      "bg-rose-100 text-rose-700",

    purple:
      "bg-violet-100 text-violet-700",

    gray:
      "bg-slate-100 text-slate-700",

  };

  return (

    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[color]}`}
    >

      {children}

    </span>

  );

}

export default Badge;