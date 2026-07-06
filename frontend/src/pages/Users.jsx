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
  <thead className="border-b border-gray-300">
    <tr className="text-black text-left">
      <th className="py-2">Full Name</th>
      <th className="py-2">Title</th>
      <th className="py-2">Email</th>
      <th className="py-2">Role</th>
      <th className="py-2">Active</th>
    </tr>
  </thead>
);

const TableRow = ({ user, onEdit, onDelete }) => (
  <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
    <td className="p-2">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-blue-700">
          <span className="text-xs md:text-sm text-center">
            {getInitials(user.name)}
          </span>
        </div>
        {user.name}
      </div>
    </td>

    <td className="p-2">{user.title}</td>
    <td className="p-2">{user.email || "user.emal.com"}</td>
    <td className="p-2">{user.role}</td>

    <td>
      <button
        className={clsx(
          "w-fit px-4 py-1 rounded-full",
          user?.isActive ? "bg-blue-200" : "bg-yellow-100",
        )}
      >
        {user?.isActive ? "Active" : "Disabled"}
      </button>
    </td>

    <td className="p-2 flex gap-4 justify-end">
      <Button
        className="text-blue-600 hover:text-blue-500 font-semibold sm:px-0"
        label="Edit"
        type="button"
        onClick={() => onEdit(user)}
      />

      <Button
        className="text-red-700 hover:text-red-500 font-semibold sm:px-0"
        label="Delete"
        type="button"
        onClick={() => onDelete(user?._id)}
      />
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

  const [deleteUserProfile, { isLoading: isDeleting }] =
    useDeleteUserProfileMutation();

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
      <div className="w-full md:px-1 px-0 mb-6">
        <div className="flex items-center justify-between mb-8">
          <Title title="  Team Members" />
          <Button
            label="Add New User"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md 2xl:py-2.5"
            onClick={() => {
              setSelectedUser(null);
              setOpen(true);
            }}
          />
        </div>

        <div className="bg-white px-2 md:px-4 py-4 shadow-md rounded">
          <div className="overflow-x-auto">
            <table className="w-full mb-5">
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
                    <td className="py-4 text-gray-500" colSpan={6}>
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
