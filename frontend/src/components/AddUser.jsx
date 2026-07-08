import { useForm } from "react-hook-form";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../redux/slices/authSlice";
import {
  useRegisterUserMutation,
  useUpdateUserProfileMutation,
} from "../redux/slices/apiSlice";

const AddUser = ({ open, setOpen, userData, onSuccess }) => {
  const defaultValues = userData ?? { isAdmin: false };
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [updateUserProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const handleOnSubmit = async (data) => {
    try {
      if (userData?._id) {
        const res = await updateUserProfile({
          ...data,
          _id: userData._id,
        }).unwrap();
        toast.success(res?.message || "User updated successfully.");
        if (res?.user) {
          dispatch(setCredentials(res.user));
          onSuccess?.(res.user);
        }
      } else {
        const res = await registerUser({
          ...data,
          password: "123456",
          isAdmin: currentUser?.isAdmin
            ? data.isAdmin === "true" || data.isAdmin === true
            : false,
        }).unwrap();
        toast.success(
          res?.message || `${res?.name || "User"} added successfully.`,
        );
        onSuccess?.(res);
      }

      setOpen(false);
    } catch (error) {
      toast.error(
        error?.data?.message || error?.error || "Unable to save user.",
      );
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Dialog.Title
          as="h2"
          className="text-base font-bold leading-6 text-gray-900 mb-6 uppercase tracking-wide"
        >
          {userData ? "Update Profile" : "Add New User"}
        </Dialog.Title>

        <div className="flex flex-col gap-5">
          <Textbox
            placeholder="Full name"
            type="text"
            name="name"
            label="Full Name"
            className="w-full rounded"
            register={register("name", {
              required: "Full name is required!",
            })}
            error={errors.name ? errors.name.message : ""}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Textbox
              placeholder="Title"
              type="text"
              name="title"
              label="Title"
              className="w-full rounded"
              register={register("title", {
                required: "Title is required!",
              })}
              error={errors.title ? errors.title.message : ""}
            />
            <Textbox
              placeholder="Role"
              type="text"
              name="role"
              label="Role"
              className="w-full rounded"
              register={register("role", {
                required: "User role is required!",
              })}
              error={errors.role ? errors.role.message : ""}
            />
          </div>

          <Textbox
            placeholder="Email Address"
            type="email"
            name="email"
            label="Email Address"
            className="w-full rounded"
            register={register("email", {
              required: "Email Address is required!",
            })}
            error={errors.email ? errors.email.message : ""}
          />

          {!userData?._id && currentUser?.isAdmin && (
            <div className="flex flex-col gap-2 pt-1">
              <label className="text-sm font-medium text-gray-700">
                Account Type
              </label>
              <div className="flex gap-6 rounded-md border border-gray-200 bg-gray-50 px-4 py-3">
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    value="false"
                    defaultChecked
                    className="accent-blue-600"
                    {...register("isAdmin")}
                  />
                  General User
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    value="true"
                    className="accent-blue-600"
                    {...register("isAdmin")}
                  />
                  Admin
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 py-6 mt-8 flex items-center justify-center gap-6">
          {isLoading || isUpdating ? (
            <Loading />
          ) : (
            <>
              <Button
                type="button"
                className="bg-white px-8 py-3 text-base font-semibold text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={() => setOpen(false)}
                label="Cancel"
              />
              <Button
                type="submit"
                className="bg-blue-600 px-10 py-3 text-base font-semibold text-white rounded-md hover:bg-blue-700"
                label="Submit"
              />
            </>
          )}
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddUser;