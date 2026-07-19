import { Inbox } from "lucide-react";

function EmptyState({
  title = "Nothing Found",
  description = "There is nothing to display.",
  button,
}) {
  return (
    <div className="bg-gradient-to-b from-slate-50 dark:from-slate-800 to-slate-100 dark:to-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 p-12 text-center">

      <div className="flex justify-center mb-5">
        <div className="bg-gradient-to-br from-blue-100 dark:from-blue-900/30 to-blue-50 dark:to-blue-900/20 p-5 rounded-full border border-blue-200 dark:border-blue-700">
          <Inbox size={42} className="text-blue-600 dark:text-blue-400" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
        {title}
      </h2>

      <p className="text-slate-600 dark:text-slate-400 mt-3 max-w-md mx-auto leading-relaxed">
        {description}
      </p>

      {button && (
        <div className="mt-8">
          {button}
        </div>
      )}

    </div>
  );
}

export default EmptyState;