import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { useGetTaskQuery } from "../../redux/slices/apiSlice";

import CommentSection from "../../components/comments/CommentSection";

function TaskDetails() {
  const { taskId } = useParams();

  const {
    data,
    isLoading,
  } = useGetTaskQuery(taskId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        Loading Task...
      </div>
    );
  }

  const task = data?.task;

  if (!task) {
    return (
      <div className="text-center mt-20">
        Task Not Found
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <Link
        to={`/tasks/${task.board}`}
        className="flex items-center gap-2 text-blue-600"
      >
        <ArrowLeft size={18} />
        Back to Tasks
      </Link>

      <div className="bg-white rounded-xl shadow p-8">

        <h1 className="text-4xl font-bold">
          {task.title}
        </h1>

        <p className="text-gray-500 mt-5">
          {task.description || "No Description"}
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div>
            <p className="text-gray-500">
              Status
            </p>

            <p className="font-semibold">
              {task.status}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Priority
            </p>

            <p className="font-semibold">
              {task.priority}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Due Date
            </p>

            <p className="font-semibold">
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "No Due Date"}
            </p>
          </div>

        </div>

      </div>

      <CommentSection taskId={taskId} />

    </div>
  );
}

export default TaskDetails;