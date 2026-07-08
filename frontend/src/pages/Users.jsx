import { useState } from "react";
import { toast } from "sonner";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import { getInitials } from "../utils";
import clsx from "clsx";
import ConfirmatioDialog, { UserAction } from "../components/Dialogs";
import AddUser from "../components/AddUser";
import {
  useGetTeamListQuery,
  useDeleteUserProfileMutation,
} from "../redux/slices/apiSlice";
import { useSelector } from "react-redux";

const TableHeader = () => (
  <thead className="border-b-2 border-gray-200">
    <tr className="text-gray-500 text-left text-sm uppercase tracking-wide">
      <th className="py-4 pl-2">Full Name</th>
      <th className="py-4">Title</th>
      <th className="py-4">Email</th>
      <th className="py-4">Role</th>
      <th className="py-4">Status</th>
      <th className="py-4 pr-2 text-right">Actions</th>
    </tr>
  </thead>
);

const TableRow = ({ user, onEdit, onDelete }) => (
  <tr className="border-b border-gray-100 text-gray-700 hover:bg-gray-50 transition-colors">
    <td className="py-4 pl-2">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 shrink-0 rounded-full text-white flex items-center justify-center text-xs font-semibold bg-blue-700">
          {getInitials(user.name)}
        </div>
        <span className="font-medium text-gray-900">{user.name}</span>
      </div>
    </td>

    <td className="py-4">{user.title}</td>
    <td className="py-4 text-gray-500">{user.email || "user@email.com"}</td>
    <td className="py-4">{user.role}</td>

    <td className="py-4">
      <span
        className={clsx(
          "inline-block px-3 py-1 text-xs font-medium rounded-full",
          user?.isActive
            ? "bg-blue-100 text-blue-700"
            : "bg-yellow-100 text-yellow-700",
        )}
      >
        {user?.isActive ? "Active" : "Disabled"}
      </span>
    </td>

    <td className="py-4 pr-2">
      <div className="flex items-center justify-end gap-4">
        <button
          onClick={() => onEdit(user)}
          className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(user?._id)}
          className="text-red-600 hover:text-red-700 text-sm font-semibold"
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

const Users = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAction, setOpenAction] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const { data: users = [], isLoading, refetch } = useGetTeamListQuery();
  const { searchTerm } = useSelector((state) => state.auth);

  const [deleteUserProfile] = useDeleteUserProfileMutation();

  const filteredUsers = searchTerm
    ? users.filter((user) => {
        const query = searchTerm.toLowerCase();

        return (
          user?.name?.toLowerCase().includes(query) ||
          user?.title?.toLowerCase().includes(query) ||
          user?.email?.toLowerCase().includes(query) ||
          user?.role?.toLowerCase().includes(query)
        );
      })
    : users;

  const userActionHandler = () => {};

  const deleteHandler = async () => {
    try {
      const res = await deleteUserProfile(selectedId).unwrap();
      toast.success(res?.message || "User deleted successfully.");
      await refetch();
      setOpenDialog(false);
      setSelectedId(null);
    } catch (err) {
      toast.error(err?.data?.message || err?.error || "Failed to delete user.");
    }
  };

  const deleteClick = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const editClick = (el) => {
    setSelectedUser(el);
    setOpen(true);
  };

  return (
    <>
      <div className="w-full px-4 md:px-6 mb-6">
        <div className="flex items-center justify-between mb-8 gap-4">
          <Title title="Team Members" />
          <Button
            label="Add New User"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-2 items-center bg-blue-600 text-white rounded-md px-4 py-2 text-sm font-semibold hover:bg-blue-700 shrink-0"
            onClick={() => {
              setSelectedUser(null);
              setOpen(true);
            }}
          />
        </div>

        <div className="bg-white px-4 md:px-6 py-6 shadow-sm rounded-lg border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full min-w-175 border-separate border-spacing-0">
              <TableHeader />
              <tbody>
                {filteredUsers?.map((user, index) => (
                  <TableRow
                    key={user?._id || index}
                    user={user}
                    onEdit={editClick}
                    onDelete={deleteClick}
                  />
                ))}
                {!isLoading && filteredUsers.length < 1 && (
                  <tr>
                    <td className="py-6 text-center text-gray-400" colSpan={6}>
                      No team members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddUser
        open={open}
        setOpen={setOpen}
        userData={selectedUser}
        key={new Date().getTime().toString()}
      />

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        onClick={deleteHandler}
      />

      <UserAction
        open={openAction}
        setOpen={setOpenAction}
        onClick={userActionHandler}
      />
    </>
  );
};

export default Users;
