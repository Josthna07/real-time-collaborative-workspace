import { useParams } from "react-router-dom";
import { useState } from "react";
import { Plus, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import EditBoardModal from "./EditBoardModal";
import {
  useGetWorkspaceBoardsQuery,
  useDeleteBoardMutation,
} from "../../redux/slices/apiSlice";

import BoardCard from "./BoardCard";
import CreateBoardModal from "./CreateBoardModal";

function Board() {
  const { workspaceId } = useParams();

  const {
    data,
    isLoading,
    refetch,
  } = useGetWorkspaceBoardsQuery(workspaceId);

  const [deleteBoard] = useDeleteBoardMutation();

  const [openModal, setOpenModal] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const boards = data?.boards || [];

  const handleDelete = async (board) => {
    if (!window.confirm(`Delete "${board.title}" ?`)) return;
    
    try {
        await deleteBoard(board._id).unwrap();

        toast.success("Board deleted successfully");

        refetch();
    } catch (err) {
      toast.error(
        err?.data?.message || "Delete failed"
      );
    }
  };

  const handleEdit = (board) => {
    setSelectedBoard(board);
    setEditOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        Loading Boards...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex justify-between items-center">

        <div>

          <Link
            to="/workspaces"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-2 transition"
          >
            <ArrowLeft size={18} />
            Back to Workspaces
          </Link>

          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Boards
          </h1>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Organize your work into boards.
          </p>

        </div>

        <button
            onClick={() => {
                console.log("Button clicked");
                setOpenModal(true);
            }}
            className="flex items-center gap-2 bg-blue-600 dark:bg-blue-700 text-white px-5 py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
            >
            <Plus size={20} />
            New Board
            </button>

      </div>

      {boards.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow dark:shadow-md p-12 text-center">

            <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200">
                No Boards Yet
            </h2>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
                Create your first board to organize tasks.
            </p>

        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {boards.map((board) => (
            <BoardCard
              key={board._id}
              board={board}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

      <CreateBoardModal
        workspaceId={workspaceId}
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          refetch();
        }}
      />
      <EditBoardModal
        open={editOpen}
        board={selectedBoard}
        onClose={() => {
            setEditOpen(false);
            refetch();
        }}
      />

    </div>
  );
}

export default Board;