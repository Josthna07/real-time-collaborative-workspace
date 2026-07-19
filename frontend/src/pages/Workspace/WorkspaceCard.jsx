import { Link } from "react-router-dom";
import {
  Pencil,
  Trash2,
  FolderOpen,
  Users,
  ArrowRight,
} from "lucide-react";

function WorkspaceCard({
  workspace,
  onEdit,
  onDelete,
}) {
  return (
    <div className="group bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg dark:hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-500 transition-all duration-300 overflow-hidden flex flex-col h-full">

      {/* Top Section */}

      <div className="p-6 flex-1 flex flex-col">

        <div className="flex items-start justify-between gap-4 mb-4">

          <div className="flex-1 min-w-0">

            <h2 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
              {workspace.name}
            </h2>

            <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm leading-relaxed line-clamp-2">
              {workspace.description || "No description provided for this workspace."}
            </p>

          </div>

          <div className="bg-gradient-to-br from-blue-50 dark:from-blue-900/30 to-blue-100 dark:to-blue-900/20 p-3 rounded-lg flex-shrink-0">

            <FolderOpen
              size={24}
              className="text-blue-600 dark:text-blue-400"
            />

          </div>

        </div>

        <div className="mt-auto flex items-center gap-2 text-slate-600 dark:text-slate-400 text-sm pt-4 border-t border-slate-100 dark:border-slate-700">

          <Users size={16} className="flex-shrink-0" />

          <span className="font-medium">
            {workspace.members?.length || 0} {workspace.members?.length === 1 ? "Member" : "Members"}
          </span>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 px-6 py-4 flex justify-between items-center gap-3">

        <Link
          to={`/boards/${workspace._id}`}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 group-hover:gap-3 transition-all"
        >
          Open
          <ArrowRight size={16} />
        </Link>

        <div className="flex items-center gap-2 ml-auto">

          <button
            onClick={() => onEdit(workspace)}
            className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition"
            title="Edit workspace"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={() => onDelete(workspace)}
            className="p-2 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 transition"
            title="Delete workspace"
          >
            <Trash2 size={16} />
          </button>

        </div>

      </div>

    </div>
  );
}

export default WorkspaceCard;