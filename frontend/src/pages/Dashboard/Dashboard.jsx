import {
  useGetWorkspacesQuery,
  useGetBoardsQuery,
  useGetTasksQuery,
  useGetNotificationsQuery,
} from "../../redux/slices/apiSlice";
import { Link } from "react-router-dom";
import PageHeader from "../../components/common/PageHeader";
import AppCard from "../../components/common/AppCard";
import StatCard from "../../components/common/StatCard";
import EmptyState from "../../components/common/EmptyState";
import LoadingSpinner from "../../components/common/LoadingSpinner";

import {
  FolderKanban,
  KanbanSquare,
  CheckSquare,
  Bell,
} from "lucide-react";

function Dashboard() {
  const {
    data: workspaceData,
    isLoading: workspaceLoading,
    error: workspaceError,
  } = useGetWorkspacesQuery();

  const {
    data: boardData,
    isLoading: boardLoading,
    error: boardError,
  } = useGetBoardsQuery();

  const {
    data: taskData,
    isLoading: taskLoading,
    error: taskError,
  } = useGetTasksQuery();

  const {
    data: notificationData,
    isLoading: notificationLoading,
    error: notificationError,
  } = useGetNotificationsQuery();

  if (
    workspaceLoading ||
    boardLoading ||
    taskLoading ||
    notificationLoading
  ) {
    return (
      <LoadingSpinner
        text="Loading Dashboard..."
        fullScreen
      />
    );
  }

  if (
    workspaceError ||
    boardError ||
    taskError ||
    notificationError
  ) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
          Dashboard API Error
        </h1>

        <pre className="bg-gray-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 p-4 rounded-xl mt-6 overflow-auto">
          {JSON.stringify(
            {
              workspaceError,
              boardError,
              taskError,
              notificationError,
            },
            null,
            2
          )}
        </pre>
      </div>
    );
  }

  const workspaces = workspaceData?.workspaces || [];
  const boards = boardData?.boards || [];
  const tasks = taskData?.tasks || [];
  const notifications =
    notificationData?.notifications || [];

  return (
    <div className="space-y-8 pb-12">

      {/* Welcome Section */}

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-xl p-8 text-white shadow-lg">

        <h1 className="text-4xl font-bold mb-2">
          Welcome back! 👋
        </h1>

        <p className="text-blue-100 text-lg">
          Here's an overview of your collaborative workspace and recent activity.
        </p>

      </div>

      {/* Statistics Grid */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Workspaces"
          value={workspaces.length}
          icon={<FolderKanban size={24} />}
          color="blue"
        />

        <StatCard
          title="Boards"
          value={boards.length}
          icon={<KanbanSquare size={24} />}
          color="green"
        />

        <StatCard
          title="Tasks"
          value={tasks.length}
          icon={<CheckSquare size={24} />}
          color="amber"
        />

        <StatCard
          title="Notifications"
          value={notifications.length}
          icon={<Bell size={24} />}
          color="purple"
        />

      </div>

      {/* Recent Items Section */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* Recent Workspaces */}

        <AppCard>

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Recent Workspaces
            </h2>

            <Link to="/workspaces" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition">
              View All →
            </Link>

          </div>

          {workspaces.length === 0 ? (

            <EmptyState
              title="No Workspaces Yet"
              description="Create your first workspace to get started with collaboration."
            />

          ) : (

            <div className="space-y-3">

              {workspaces.slice(0, 5).map((workspace) => (

                <Link
                  key={workspace._id}
                  to="/workspaces"
                  className="block border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-200 group"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div className="flex-1 min-w-0">

                      <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                        {workspace.name}
                      </h3>

                      <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 line-clamp-1">
                        {workspace.description || "No description provided"}
                      </p>

                    </div>

                    <span className="text-xl group-hover:translate-x-1 transition">→</span>

                  </div>

                </Link>

              ))}

            </div>

          )}

        </AppCard>

        {/* Recent Tasks */}

        <AppCard>

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Recent Tasks
            </h2>

            <Link to="/tasks" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition">
              View All →
            </Link>

          </div>

          {tasks.length === 0 ? (

            <EmptyState
              title="No Tasks Yet"
              description="Create your first task to start organizing work."
            />

          ) : (

            <div className="space-y-3">

              {tasks.slice(0, 5).map((task) => (

                <Link
                  key={task._id}
                  to={`/task/${task._id}`}
                  className="block border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-slate-700 transition-all duration-200 group"
                >

                  <div className="flex justify-between items-start gap-3">

                    <div className="flex-1 min-w-0">

                      <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition line-clamp-1">
                        {task.title}
                      </h3>

                      <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 line-clamp-1">
                        {task.description || "No description"}
                      </p>

                    </div>

                    <span className={`inline-flex items-center px-2.5 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap flex-shrink-0 ${
                      task.status === "Done" ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300" :
                      task.status === "In Progress" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300" :
                      "bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300"
                    }`}>
                      {task.status || "To Do"}
                    </span>

                  </div>

                </Link>

              ))}

            </div>

          )}

        </AppCard>

      </div>

    </div>
  );
}

export default Dashboard;