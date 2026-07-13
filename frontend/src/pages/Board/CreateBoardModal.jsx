import { useState } from "react";
import { X } from "lucide-react";
import { useCreateBoardMutation } from "../../redux/slices/apiSlice";
import { useSelector } from "react-redux";
import { toast } from "sonner";
function CreateBoardModal({
  workspaceId,
  open,
  onClose,
}) {
  const [title, setTitle] = useState("");
  const { user } = useSelector((state) => state.auth);

  const [createBoard, { isLoading }] =
    useCreateBoardMutation();

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Board title is required");
      return;
    }

    try {
      await createBoard({
        title,
        workspace: workspaceId,
        createdBy: user._id,
      }).unwrap();

      setTitle("");

      toast.success("Board created successfully");
      onClose();
    } catch (err) {
      toast.error(
        err?.data?.message || "Failed to create board."
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl w-[450px] p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Create Board
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <form onSubmit={handleSubmit}>

          <input
            className="w-full border rounded-lg p-3 mb-5 outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Board Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <button
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            {isLoading
              ? "Creating..."
              : "Create Board"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateBoardModal;