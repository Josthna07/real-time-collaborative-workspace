import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { toast } from "sonner";
import EditTaskModal from "./EditTaskModal";
import {
  useGetTasksQuery,
  useDeleteTaskMutation,
} from "../../redux/slices/apiSlice";

import TaskCard from "./TaskCard";
import CreateTaskModal from "./CreateTaskModal";

function Task() {
  const { boardId } = useParams();

  const {
    data,
    isLoading,
    refetch,
  } = useGetTasksQuery(boardId);

  const [deleteTask] = useDeleteTaskMutation();

  const [openModal, setOpenModal] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const tasks = data?.tasks || [];

  const handleDelete = async (task) => {
    if (!window.confirm(`Delete "${task.title}" ?`)) return;

    try {
      await deleteTask(task._id).unwrap();
      toast.success("Task deleted successfully");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setEditOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        Loading Tasks...
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">

      <div className="flex justify-between items-center">

        <div>

          <Link
            to="/workspaces"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium mb-3 transition"
          >
            <ArrowLeft size={18} />
            Back to Workspaces
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Tasks
          </h1>

          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage and organize all tasks inside this board.
          </p>

        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 text-white px-6 py-3 rounded-lg hover:shadow-lg dark:hover:shadow-xl transition-all duration-200 font-semibold whitespace-nowrap"
        >
          <Plus size={20} />
          Create Task
        </button>

      </div>

      {tasks.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm dark:shadow-md border border-slate-100 dark:border-slate-700 p-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 mb-4">
            <Plus size={32} className="text-slate-400 dark:text-slate-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No Tasks Yet</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Get started by creating your first task.</p>
          <button
            onClick={() => setOpenModal(true)}
            className="inline-flex items-center gap-2 bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition font-medium"
          >
            <Plus size={18} />
            Create Task
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}

        </div>
      )}

      <CreateTaskModal
        boardId={boardId}
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          refetch();
        }}
      />
      <EditTaskModal
        open={editOpen}
        task={selectedTask}
        onClose={() => {
            setEditOpen(false);
            refetch();
        }}
      />

    </div>
  );
}

export default Task;