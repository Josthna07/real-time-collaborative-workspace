import React from "react";
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdRadioButtonUnchecked,
} from "react-icons/md";
import { LuClipboardPen } from "react-icons/lu";
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import moment from "moment";
import clsx from "clsx";
import { Chart } from "../components/Chart";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../utils";
import UserInfo from "../components/UserInfo";
import Loading from "../components/Loader";
import { useGetTasksQuery } from "../redux/slices/apiSlice";

const normalizeStage = (stage) => {
  const s = (stage || "").toLowerCase().trim();
  if (s === "to do" || s === "todo") return "todo";
  if (s === "in progress" || s === "inprogress") return "in progress";
  if (s === "completed" || s === "complete" || s === "done") return "completed";
  return s || "todo";
};

const normalizePriority = (priority) =>
  (priority || "normal").toLowerCase().trim();

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

const TaskTableHeader = () => (
  <thead className="border-b border-gray-300">
    <tr className="text-black text-left text-sm uppercase tracking-wide text-gray-500">
      <th className="py-3">Task Title</th>
      <th className="py-3">Priority</th>
      <th className="py-3">Team</th>
      <th className="py-3 hidden md:table-cell">Created At</th>
    </tr>
  </thead>
);

const TaskTableRow = ({ task }) => {
  const stageKey = normalizeStage(task.stage);
  const priorityKey = normalizePriority(task.priority);

  return (
    <tr className="border-b border-gray-100 text-gray-600 hover:bg-gray-50">
      <td className="py-3">
        <div className="flex items-center gap-2">
          <div
            className={clsx(
              "w-3 h-3 shrink-0 rounded-full",
              TASK_TYPE[stageKey] || "bg-gray-400",
            )}
          />
          <p className="text-base text-gray-900">{task.title}</p>
        </div>
      </td>

      <td className="py-3">
        <div className="flex gap-1.5 items-center">
          <span className={clsx("text-lg", PRIORITY_COLORS[priorityKey])}>
            {ICONS[priorityKey]}
          </span>
          <span className="capitalize">{priorityKey}</span>
        </div>
      </td>

      <td className="py-3">
        <div className="flex">
          {task.team?.map((m, index) => (
            <div
              key={index}
              className={clsx(
                "w-7 h-7 rounded-full text-white flex items-center justify-center text-xs -mr-1 ring-2 ring-white overflow-hidden",
                BGS[index % BGS.length],
              )}
            >
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </td>
      <td className="py-3 hidden md:table-cell">
        <span className="text-sm text-gray-500">
          {moment(task?.date).fromNow()}
        </span>
      </td>
    </tr>
  );
};

const TaskTable = ({ tasks }) => {
  return (
    <div className="w-full md:w-2/3 bg-white px-4 md:px-6 py-5 shadow-sm rounded-lg border border-gray-100">
      <table className="w-full">
        <TaskTableHeader />
        <tbody>
          {tasks?.map((task, id) => (
            <TaskTableRow key={task._id || id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UserTableHeader = () => (
  <thead className="border-b border-gray-300">
    <tr className="text-left text-sm uppercase tracking-wide text-gray-500">
      <th className="py-3">Full Name</th>
      <th className="py-3">Status</th>
      <th className="py-3">Created At</th>
    </tr>
  </thead>
);

const UserTableRow = ({ user }) => (
  <tr className="border-b border-gray-100 text-gray-600 hover:bg-gray-50">
    <td className="py-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 shrink-0 rounded-full text-white flex items-center justify-center text-sm bg-violet-700">
          <span className="text-center">{getInitials(user?.name)}</span>
        </div>
        <div>
          <p className="text-gray-900">{user.name}</p>
          <span className="text-xs text-gray-500">{user?.role}</span>
        </div>
      </div>
    </td>
    <td className="py-3">
      <p
        className={clsx(
          "inline-block w-fit px-3 py-1 rounded-full text-xs font-medium",
          user?.isActive
            ? "bg-blue-100 text-blue-700"
            : "bg-yellow-100 text-yellow-700",
        )}
      >
        {user?.isActive ? "Active" : "Disabled"}
      </p>
    </td>
    <td className="py-3 text-sm text-gray-500">
      {moment(user?.createdAt).fromNow()}
    </td>
  </tr>
);

const UserTable = ({ users }) => {
  return (
    <div className="w-full md:w-1/3 bg-white h-fit px-4 md:px-6 py-5 shadow-sm rounded-lg border border-gray-100">
      <table className="w-full">
        <UserTableHeader />
        <tbody>
          {users?.map((user, index) => (
            <UserTableRow key={index + (user?._id || "")} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Card = ({ label, count, bg, icon }) => (
  <div className="w-full h-32 bg-white p-5 shadow-sm rounded-lg border border-gray-100 flex items-center justify-between">
    <div className="h-full flex flex-1 flex-col justify-between">
      <p className="text-sm font-medium text-gray-500 tracking-wide">
        {label}
      </p>
      <span className="text-3xl font-semibold text-gray-900">{count}</span>
    </div>
    <div
      className={clsx(
        "w-11 h-11 shrink-0 rounded-full flex items-center justify-center text-white",
        bg,
      )}
    >
      {icon}
    </div>
  </div>
);

const Dashboard = () => {
  const { data: tasksResponse, isLoading } = useGetTasksQuery();
  const tasks = Array.isArray(tasksResponse?.tasks) ? tasksResponse.tasks : [];

  if (isLoading) {
    return (
      <div className="py-10">
        <Loading />
      </div>
    );
  }

  const totals = tasks.reduce(
    (acc, task) => {
      const stage = normalizeStage(task.stage);
      acc[stage] = (acc[stage] || 0) + 1;
      return acc;
    },
    { todo: 0, "in progress": 0, completed: 0 },
  );

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: tasks.length,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      _id: "2",
      label: "COMPLETED TASK",
      total: totals.completed,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS",
      total: totals["in progress"],
      icon: <LuClipboardPen />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals.todo,
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]",
    },
  ];

  const last10Task = [...tasks]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  const usersMap = {};
  tasks.forEach((task) => {
    task.team?.forEach((member) => {
      if (member?._id) usersMap[member._id] = member;
    });
  });
  const users = Object.values(usersMap);

  return (
    <div className="w-full px-4 md:px-6 py-6 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {stats.map(({ icon, bg, label, total, _id }) => (
          <Card key={_id} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      <div className="w-full bg-white p-5 md:p-6 rounded-lg shadow-sm border border-gray-100">
        <h4 className="text-lg text-gray-700 font-semibold mb-4">
          Chart by Priority
        </h4>
        <Chart tasks={tasks} />
      </div>

      <div className="w-full flex flex-col md:flex-row gap-5 2xl:gap-8">
        {tasks.length === 0 ? (
          <p className="text-gray-500">
            No tasks yet. Create one to see it here.
          </p>
        ) : (
          <>
            <TaskTable tasks={last10Task} />
            <UserTable users={users} />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;