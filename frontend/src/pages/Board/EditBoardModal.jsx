import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useUpdateBoardMutation } from "../../redux/slices/apiSlice";
import { toast } from "sonner";
function EditBoardModal({
  open,
  onClose,
  board,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [updateBoard, { isLoading }] =
    useUpdateBoardMutation();

  useEffect(() => {
    if (board) {
      setName(board.name || "");
      setDescription(board.description || "");
    }
  }, [board]);

  if (!open) return null;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateBoard({
        id: board._id,
        data: {
          name,
          description,
        },
      }).unwrap();

      toast.success("Board updated successfully");
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

      <div className="bg-white rounded-xl w-[500px] p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Edit Board
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
            value={name}
            placeholder="Board Name"
            onChange={(e) => setName(e.target.value)}
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

          <button
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3"
          >
            {isLoading
              ? "Updating..."
              : "Update Board"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditBoardModal;