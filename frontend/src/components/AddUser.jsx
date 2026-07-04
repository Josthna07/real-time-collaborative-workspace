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
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="">
          <Dialog.Title
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            {userData ? "UPDATE PROFILE" : "ADD NEW USER"}
          </Dialog.Title>
          <div className="mt-2 flex flex-col gap-6">
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

            {/* Only show Admin/General choice if a new user is being added AND the current logged-in user is an admin */}
            {!userData?._id && currentUser?.isAdmin && (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Account Type
                </label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="radio"
                      value="false"
                      defaultChecked
                      {...register("isAdmin")}
                    />
                    General User
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="radio"
                      value="true"
                      {...register("isAdmin")}
                    />
                    Admin
                  </label>
                </div>
              </div>
            )}
          </div>

          {isLoading || isUpdating ? (
            <div className="py-5">
              <Loading />
            </div>
          ) : (
            <div className="py-3 mt-4 sm:flex sm:flex-row-reverse">
              <Button
                type="submit"
                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
                label="Submit"
              />

              <Button
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                onClick={() => setOpen(false)}
                label="Cancel"
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddUser;