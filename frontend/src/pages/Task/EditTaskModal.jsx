import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { useUpdateTaskMutation } from "../../redux/slices/apiSlice";

function EditTaskModal({
  open,
  onClose,
  task,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Todo");
  const [priority, setPriority] = useState("normal");

  const [updateTask, { isLoading }] =
    useUpdateTaskMutation();

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setStatus(task.status || "Todo");
      setPriority(task.priority || "normal");
    }
  }, [task]);

  if (!open) return null;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateTask({
        id: task._id,
        data: {
          title,
          description,
          status,
          priority,
        },
      }).unwrap();

      toast.success("Task updated successfully");
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl w-[550px] p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Edit Task
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <form
          onSubmit={submitHandler}
          className="space-y-5"
        >

          <input
            className="w-full border rounded-lg p-3"
            value={title}
            placeholder="Task Title"
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <textarea
            rows={4}
            className="w-full border rounded-lg p-3"
            value={description}
            placeholder="Description"
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <div className="grid grid-cols-2 gap-4">

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value)
              }
              className="border rounded-lg p-3"
            >
              <option>Todo</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value)
              }
              className="border rounded-lg p-3"
            >
              <option>low</option>
              <option>normal</option>
              <option>medium</option>
              <option>high</option>
            </select>

          </div>

          <button
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3"
          >
            {isLoading
              ? "Updating..."
              : "Update Task"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditTaskModal;