import { useForm } from "react-hook-form";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import Button from "../Button";
import { toast } from "sonner";
import { useCreateSubTaskMutation } from "../../redux/slices/apiSlice";

const AddSubTask = ({ open, setOpen, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [addSbTask, { isLoading }] = useCreateSubTaskMutation();

  const handleOnSubmit = async (data) => {
    try {
      const res = await addSbTask({ id, data }).unwrap();
      toast.success(res?.message || "Sub-task added successfully.");
      setOpen(false);
    } catch (err) {
      toast.error(
        err?.data?.message || err?.error || "Failed to add sub-task.",
      );
    }
  };

  return (
    <ModalWrapper open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <Dialog.Title
          as="h2"
          className="text-base font-bold leading-6 text-gray-900 mb-4"
        >
          ADD SUB-TASK
        </Dialog.Title>
        <div className="mt-2 flex flex-col gap-6">
          <Textbox
            placeholder="Sub-Task title"
            type="text"
            name="title"
            label="Title"
            className="w-full rounded"
            register={register("title", {
              required: "Title is required!",
            })}
            error={errors.title ? errors.title.message : ""}
          />

          <div className="flex items-center gap-4">
            <Textbox
              placeholder="Date"
              type="date"
              name="date"
              label="Task Date"
              className="w-full rounded"
              register={register("date", {
                required: "Date is required!",
              })}
              error={errors.date ? errors.date.message : ""}
            />
            <Textbox
              placeholder="Tag"
              type="text"
              name="tag"
              label="Tag"
              className="w-full rounded"
              register={register("tag", {
                required: "Tag is required!",
              })}
              error={errors.tag ? errors.tag.message : ""}
            />
          </div>
        </div>

        <div className="bg-gray-50 py-6 mt-4 flex items-center justify-center gap-6">
          <Button
            type="button"
            className="bg-white px-8 py-3 text-base font-semibold text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50"
            onClick={() => setOpen(false)}
            label="Cancel"
          />
          <Button
            type="submit"
            className="bg-blue-600 px-10 py-3 text-base font-semibold text-white rounded-md hover:bg-blue-700"
            label={isLoading ? "Adding..." : "Add Task"}
          />
        </div>
      </form>
    </ModalWrapper>
  );
};

export default AddSubTask;