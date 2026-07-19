import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";
import PrimaryButton from "../../components/common/PrimaryButton";
import PageHeader from "../../components/common/PageHeader";
import EmptyState from "../../components/common/EmptyState";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import EditWorkspaceModal from "./EditWorkspaceModal";
import {
  useGetWorkspacesQuery,
  useDeleteWorkspaceMutation,
} from "../../redux/slices/apiSlice";

import WorkspaceCard from "./WorkspaceCard";
import CreateWorkspaceModal from "./CreateWorkspaceModal";

function Workspace() {
  const { data, isLoading, refetch } = useGetWorkspacesQuery();

  const [deleteWorkspace] = useDeleteWorkspaceMutation();

  const [openModal, setOpenModal] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [search, setSearch] = useState("");

  const workspaces = data?.workspaces || [];

  const filtered = workspaces.filter((workspace) =>
    workspace.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (workspace) => {
    const confirmDelete = window.confirm(
      `Delete "${workspace.name}" ?`
    );

    if (!confirmDelete) return;

    try {
      await deleteWorkspace(workspace._id).unwrap();

      toast.success("Workspace deleted successfully");

      refetch();
    } catch (err) {
      toast.error(
        err?.data?.message || "Delete failed"
      );
   }
  };

  const handleEdit = (workspace) => {
    setSelectedWorkspace(workspace);
    setEditOpen(true);
  };

  if (isLoading) {
    return (
      <LoadingSpinner
        text="Loading Workspaces..."
        fullScreen
      />
    );
  }

  return (
    <div className="min-h-full bg-slate-50 dark:bg-slate-900 -m-6 p-8 space-y-8">
      {/* Header */}

      <PageHeader
        title="Workspaces"
        subtitle="Organize projects, collaborate with your team, and manage everything from one place."
        action={
          <PrimaryButton onClick={() => setOpenModal(true)}>
            <Plus size={20} />
            New Workspace
          </PrimaryButton>
        }
      />

      {/* Search */}

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm dark:shadow-md border border-slate-200 dark:border-slate-700 p-4">
        <div className="relative max-w-md">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
        />

        <input
          type="text"
          placeholder="Search workspaces..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl py-3 pl-11 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-slate-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
        />
        </div>

      </div>

      {/* Grid */}

      {filtered.length === 0 ? (
        <EmptyState
          title="No Workspaces"
          description="Create your first workspace to get started."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-7">
          {filtered.map((workspace) => (
            <WorkspaceCard
              key={workspace._id}
              workspace={workspace}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <CreateWorkspaceModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          refetch();
        }}
      />
      <EditWorkspaceModal
        open={editOpen}
        workspace={selectedWorkspace}
        onClose={() => {
          setEditOpen(false);
          refetch();
        }}
      />
    </div>
  );
}

export default Workspace;