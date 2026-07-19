function StatCard({
  title,
  value,
  icon,
  color = "blue",
}) {

  const colors = {
    blue: {
      bg: "bg-blue-50",
      icon: "text-blue-600",
      border: "border-blue-100",
    },

    green: {
      bg: "bg-emerald-50",
      icon: "text-emerald-600",
      border: "border-emerald-100",
    },

    amber: {
      bg: "bg-amber-50",
      icon: "text-amber-600",
      border: "border-amber-100",
    },

    purple: {
      bg: "bg-violet-50",
      icon: "text-violet-600",
      border: "border-violet-100",
    },
  };

  const c = colors[color];

  return (

    <div
      className={`bg-white rounded-3xl border ${c.border} p-6 shadow-sm hover:shadow-lg transition duration-300`}
    >

      <div className="flex justify-between items-center">

        <div>

          <p className="text-slate-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-slate-800 mt-3">
            {value}
          </h2>

        </div>

        <div
          className={`${c.bg} ${c.icon} w-16 h-16 rounded-2xl flex items-center justify-center`}
        >
          {icon}
        </div>

      </div>

    </div>

  );

}

export default StatCard;