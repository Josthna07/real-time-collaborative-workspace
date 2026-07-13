import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

import {
  LayoutDashboard,
  FolderKanban,
  Bell,
  User,
  Settings,
  LogOut,
} from "lucide-react";

function Sidebar() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      title: "Workspaces",
      icon: FolderKanban,
      path: "/workspaces",
    },
    {
      title: "Notifications",
      icon: Bell,
      path: "/notifications",
    },
    {
      title: "Profile",
      icon: User,
      path: "/profile",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  };

  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-white flex flex-col shadow-2xl transition-colors duration-200">

      {/* Logo Section */}

      <div className="px-6 py-6 border-b border-slate-700/50">

        <div className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 mb-3 shadow-lg">
          <span className="text-white font-bold text-lg">WM</span>
        </div>

        <h1 className="text-xl font-bold text-white">
          Workspace Manager
        </h1>

        <p className="text-xs text-slate-400 mt-1">
          Real-time Collaboration
        </p>

      </div>

      {/* User Profile */}

      <div className="px-6 py-4 border-b border-slate-700/50 bg-slate-800/50">

        <div className="flex items-center gap-3">

          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0">

            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : "U"}

          </div>

          <div className="min-w-0">

            <h2 className="font-semibold text-sm text-white truncate">
              {user?.name || "User"}
            </h2>

            <p className="text-xs text-slate-400 truncate">
              {user?.email}
            </p>

          </div>

        </div>

      </div>

      {/* Navigation Menu */}

      <nav className="flex-1 px-4 py-6 space-y-2">

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/50"
                    : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                }`
              }
            >
              <Icon size={19} className="flex-shrink-0" />

              <span>{item.title}</span>

            </NavLink>
          );
        })}

      </nav>

      {/* Logout Button */}

      <div className="border-t border-slate-700/50 p-4 bg-slate-800/50">

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut size={19} className="flex-shrink-0" />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;
