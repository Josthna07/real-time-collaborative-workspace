import { useState } from "react";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useCreateTaskMutation } from "../../redux/slices/apiSlice";

function CreateTaskModal({
  boardId,
  open,
  onClose,
}) {
  const { user } = useSelector((state) => state.auth);

  const [createTask, { isLoading }] =
    useCreateTaskMutation();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Todo",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Task title is required");
      return;
    }

    try {
      await createTask({
        ...formData,
        board: boardId,
        createdBy: user._id,
      }).unwrap();

      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        status: "Todo",
      });

      toast.success("Task created successfully");
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create task");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl w-[500px] p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Create Task
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <textarea
            rows={4}
            name="description"
            placeholder="Task Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option>Todo</option>
            <option>In Progress</option>
            <option>Review</option>
            <option>Done</option>
          </select>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            {isLoading ? "Creating..." : "Create Task"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateTaskModal;