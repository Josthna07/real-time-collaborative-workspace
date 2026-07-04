import clsx from "clsx";
import { useMemo, useState } from "react";
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineRestore,
  MdRadioButtonUnchecked,
} from "react-icons/md";
import { toast } from "sonner";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { PRIOTITYSTYELS, TASK_TYPE } from "../utils";
import ConfirmatioDialog from "../components/Dialogs";
import {
  useDeleteRestoreTaskMutation,
  useGetTasksQuery,
} from "../redux/slices/apiSlice";

const normalizeStage = (stage) => {
  const s = (stage || "").toLowerCase().trim();
  if (s === "to do" || s === "todo") return "todo";
  if (s === "in progress" || s === "inprogress") return "in progress";
  if (s === "completed" || s === "complete" || s === "done") return "completed";
  return s || "todo";
};

const normalizePriority = (priority) => (priority || "normal").toLowerCase().trim();

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  normal: <MdRadioButtonUnchecked />,
  low: <MdKeyboardArrowDown />,
};

const PRIORITY_COLORS = {
  high: "text-red-600",
  medium: "text-yellow-600",
  normal: "text-blue-600",
  low: "text-green-600",
  ...PRIOTITYSTYELS,
};

const TableHeader = () => (
  <thead className="border-b border-gray-300">
    <tr className="text-black text-left">
      <th className="py-2">Task Title</th>
      <th className="py-2">Priority</th>
      <th className="py-2">Stage</th>
      <th className="py-2 line-clamp-1">Modified On</th>
      <th className="py-2" />
    </tr>
  </thead>
);

const Trash = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("delete");
  const [selected, setSelected] = useState("");
  const {
    data: tasksResponse,
    isLoading,
    refetch,
  } = useGetTasksQuery(
    { isTrashed: true },
    { refetchOnMountOrArgChange: true },
  );
  const [deleteRestoreTask, { isLoading: isMutating }] =
    useDeleteRestoreTaskMutation();

  const tasks = useMemo(
    () => (Array.isArray(tasksResponse?.tasks) ? tasksResponse.tasks : []),
    [tasksResponse],
  );

  const deleteAllClick = () => {
    setType("deleteAll");
    setMsg("Do you want to permanently delete all items?");
    setOpenDialog(true);
  };

  const restoreAllClick = () => {
    setType("restoreAll");
    setMsg("Do you want to restore all items in the trash?");
    setOpenDialog(true);
  };

  const deleteClick = (id) => {
    setType("delete");
    setSelected(id);
    setMsg("Do you want to permanently delete the selected item?");
    setOpenDialog(true);
  };

  const restoreClick = (id) => {
    setSelected(id);
    setType("restore");
    setMsg("Do you want to restore the selected item?");
    setOpenDialog(true);
  };

  const deleteRestoreHandler = async () => {
    try {
      const payload =
        type === "deleteAll" || type === "restoreAll"
          ? { actionType: type }
          : { id: selected, actionType: type };

      const res = await deleteRestoreTask(payload).unwrap();
      toast.success(res?.message || "Operation performed successfully.");
      await refetch();
      setOpenDialog(false);
      setSelected("");
    } catch (error) {
      toast.error(
        error?.data?.message || error?.error || "Unable to update trash.",
      );
    }
  };

  const TableRow = ({ item }) => {
    const stageKey = normalizeStage(item.stage);
    const priorityKey = normalizePriority(item?.priority);

    return (
      <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
        <td className="py-2">
          <div className="flex items-center gap-2">
            <div
              className={clsx(
                "w-4 h-4 rounded-full",
                TASK_TYPE[stageKey] || "bg-gray-400",
              )}
            />
            <p className="w-full line-clamp-2 text-base text-black">
              {item?.title}
            </p>
          </div>
        </td>

        <td className="py-2 capitalize">
          <div className="flex gap-1 items-center">
            <span className={clsx("text-lg", PRIORITY_COLORS[priorityKey])}>
              {ICONS[priorityKey]}
            </span>
            <span>{priorityKey}</span>
          </div>
        </td>

        <td className="py-2 capitalize text-center md:text-start">
          {stageKey}
        </td>
        <td className="py-2 text-sm">
          {new Date(item?.updatedAt || item?.date).toDateString()}
        </td>

        <td className="py-2 flex gap-1 justify-end">
          <Button
            icon={<MdOutlineRestore className="text-xl text-gray-500" />}
            onClick={() => restoreClick(item._id)}
            disabled={isMutating}
          />
          <Button
            icon={<MdDelete className="text-xl text-red-600" />}
            onClick={() => deleteClick(item._id)}
            disabled={isMutating}
          />
        </td>
      </tr>
    );
  };

  if (isLoading) {
    return (
      <div className="py-10">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="w-full md:px-1 px-0 mb-6">
        <div className="flex items-center justify-between mb-8">
          <Title title="Trashed Tasks" />

          <div className="flex gap-2 md:gap-4 items-center">
            <Button
              label="Restore All"
              icon={<MdOutlineRestore className="text-lg hidden md:flex" />}
              className="flex flex-row-reverse gap-1 items-center text-black text-sm md:text-base rounded-md 2xl:py-2.5"
              onClick={restoreAllClick}
              disabled={isMutating || tasks.length < 1}
            />
            <Button
              label="Delete All"
              icon={<MdDelete className="text-lg hidden md:flex" />}
              className="flex flex-row-reverse gap-1 items-center text-red-600 text-sm md:text-base rounded-md 2xl:py-2.5"
              onClick={deleteAllClick}
              disabled={isMutating || tasks.length < 1}
            />
          </div>
        </div>

        <div className="bg-white px-2 md:px-6 py-4 shadow-md rounded">
          <div className="overflow-x-auto">
            <table className="w-full mb-5">
              <TableHeader />
              <tbody>
                {tasks.map((tk, id) => (
                  <TableRow key={tk?._id || id} item={tk} />
                ))}
                {tasks.length < 1 && (
                  <tr>
                    <td className="py-4 text-gray-500" colSpan={5}>
                      No trashed tasks found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmatioDialog
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        setMsg={setMsg}
        type={type}
        setType={setType}
        onClick={deleteRestoreHandler}
      />
    </>
  );
};

export default Trash;