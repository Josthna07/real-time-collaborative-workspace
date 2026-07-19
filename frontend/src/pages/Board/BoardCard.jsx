import { Link } from "react-router-dom";
import { Pencil, Trash2, ArrowRight } from "lucide-react";

function BoardCard({
  board,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-2xl font-semibold">
            {board.title}
          </h2>

          <p className="text-gray-500 mt-2">
            {board.description || "No description"}
          </p>

        </div>

        <div className="flex gap-2">

          <button
            onClick={() => onEdit(board)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(board)}
            className="p-2 rounded-lg hover:bg-red-100 text-red-600"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

      <div className="mt-6 flex justify-between items-center">

        <span className="text-sm text-gray-500">
          Created Board
        </span>

        <Link
          to={`/tasks/${board._id}`}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          Open

          <ArrowRight size={18} />
        </Link>

      </div>

    </div>
  );
}

export default BoardCard;