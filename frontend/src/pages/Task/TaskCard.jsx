import { Link } from "react-router-dom";
import { Pencil, Trash2, ArrowRight, AlertCircle } from "lucide-react";

function TaskCard({
  task,
  onEdit,
  onDelete,
}) {
  const priorityColors = {
    High: "bg-red-100 text-red-800 border-red-300",
    Medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Low: "bg-green-100 text-green-800 border-green-300",
  };

  const statusColors = {
    "To Do": "bg-slate-100 text-slate-800",
    "In Progress": "bg-blue-100 text-blue-800",
    "Done": "bg-green-100 text-green-800",
    "On Hold": "bg-orange-100 text-orange-800",
  };

  const priority = task.priority || "Medium";
  const status = task.status || "To Do";

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-100 transition-all duration-300 p-6 flex flex-col justify-between group">

      <div>

        <div className="flex justify-between items-start gap-3 mb-4">

          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-slate-900 line-clamp-2 group-hover:text-blue-600 transition">
              {task.title}
            </h2>
          </div>

          <div className="flex gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition">

            <button
              onClick={() => onEdit(task)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
              title="Edit task"
            >
              <Pencil size={18} />
            </button>

            <button
              onClick={() => onDelete(task)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
              title="Delete task"
            >
              <Trash2 size={18} />
            </button>

          </div>

        </div>

        <p className="text-slate-600 text-sm mt-2 line-clamp-2">
          {task.description || "No description provided"}
        </p>

      </div>

      <div className="mt-6 space-y-4 pt-4 border-t border-slate-100">

        <div className="flex items-center justify-between gap-3 text-sm">

          <span className="text-slate-600 font-medium">
            Status
          </span>

          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusColors[status] || statusColors["To Do"]}`}>
            {status}
          </span>

        </div>

        <div className="flex items-center justify-between gap-3 text-sm">

          <span className="text-slate-600 font-medium">
            Priority
          </span>

          <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold border ${priorityColors[priority] || priorityColors.Medium}`}>
            {priority === "High" && <AlertCircle size={14} />}
            {priority}
          </div>

        </div>

        <Link
          to={`/task/${task._id}`}
          className="inline-flex items-center justify-center gap-2 w-full mt-3 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg py-2 transition"
        >
          View Details
          <ArrowRight size={16} />
        </Link>

      </div>

    </div>
  );
}

export default TaskCard;