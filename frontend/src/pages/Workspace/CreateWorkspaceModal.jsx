import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import PrimaryButton from "../../components/common/PrimaryButton";
import {
  useCreateWorkspaceMutation,
} from "../../redux/slices/apiSlice";

function CreateWorkspaceModal({
  open,
  onClose,
}) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [createWorkspace] =
    useCreateWorkspaceMutation();

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await createWorkspace({
        name,
        description,
      }).unwrap();

      setName("");
      setDescription("");

      
      toast.success("Workspace created successfully");
      onClose();

    } catch (err) {
      toast.error(err.data?.message || "Failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

        <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-700 dark:to-violet-700 px-8 py-6 flex justify-between items-center">

            <div>

            <h2 className="text-2xl font-bold text-white">
                Create Workspace
            </h2>

            <p className="text-indigo-100 text-sm mt-1">
                Organize your projects in one place.
            </p>

            </div>

            <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition"
            >
            <X size={22} />
            </button>

        </div>

        {/* Body */}

        <form
            onSubmit={handleSubmit}
            className="p-8 space-y-6"
        >

            <div>

            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Workspace Name
            </label>

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter workspace name"
                className="w-full rounded-xl border border-slate-300 dark:border-slate-600 px-4 py-3 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />

            </div>

            <div>

            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Description
            </label>

            <textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe this workspace..."
                className="w-full rounded-xl border border-slate-300 dark:border-slate-600 px-4 py-3 bg-white dark:bg-slate-700 text-slate-900 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />

            </div>

            <div className="flex justify-end gap-4">

            <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition"
            >
                Cancel
            </button>

            <PrimaryButton type="submit">
                Create Workspace
            </PrimaryButton>

            </div>

        </form>

        </div>

    </div>
    );
}

export default CreateWorkspaceModal;