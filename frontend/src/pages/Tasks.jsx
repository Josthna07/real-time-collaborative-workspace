import { useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import Loading from "../components/Loader";
import Title from "../components/Title";
import Button from "../components/Button";
import { IoMdAdd } from "react-icons/io";
import Tabs from "../components/Tabs";
import BoardView from "../components/BoardView";
import Table from "../components/task/Table";
import AddTask from "../components/task/AddTask";
import { useGetTasksQuery } from "../redux/slices/apiSlice";
import { useSelector } from "react-redux";

const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const Tasks = () => {
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const { searchTerm } = useSelector((state) => state.auth);

  const status = params?.status || "";
  const { data: tasksResponse, isLoading } = useGetTasksQuery();
  const tasks = Array.isArray(tasksResponse?.tasks) ? tasksResponse.tasks : [];
  const searchedTasks = searchTerm
    ? tasks.filter((task) => {
        const query = searchTerm.toLowerCase();

        return (
          task?.title?.toLowerCase().includes(query) ||
          task?.priority?.toLowerCase().includes(query) ||
          task?.stage?.toLowerCase().includes(query) ||
          task?.team?.some(
            (member) =>
              member?.name?.toLowerCase().includes(query) ||
              member?.email?.toLowerCase().includes(query),
          )
        );
      })
    : tasks;
  const filteredTasks = status
    ? searchedTasks.filter((task) => task.stage === status)
    : searchedTasks;

  return isLoading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-full px-4 md:px-8">
      <div className="flex items-center justify-between mb-6 gap-4">
        <Title title={status ? `${status} Tasks` : "Tasks"} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label="Create Task"
            icon={<IoMdAdd className="text-xl" />}
            className="flex flex-row-reverse gap-2 items-center bg-blue-600 text-white rounded-md px-5 py-2.5 text-base font-semibold hover:bg-blue-700 shrink-0 mr-2"
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {selected !== 1 ? (
          <BoardView tasks={filteredTasks} />
        ) : (
          <div className="w-full">
            <Table tasks={filteredTasks} />
          </div>
        )}
      </Tabs>

      <AddTask open={open} setOpen={setOpen} />
    </div>
  );
};

export default Tasks;