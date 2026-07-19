import { Search, Bell, UserCircle2, Moon, Sun } from "lucide-react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/workspaces": "Workspaces",
    "/notifications": "Notifications",
    "/profile": "Profile",
    "/settings": "Settings",
  };

  let title = pageTitles[location.pathname];

  if (location.pathname.startsWith("/boards"))
    title = "Boards";

  if (location.pathname.startsWith("/tasks"))
    title = "Tasks";

  if (location.pathname.startsWith("/task"))
    title = "Task Details";

  return (
    <header className="h-20 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-8 sticky top-0 z-40 shadow-sm transition-colors duration-200">

      {/* Left - Page Title */}

      <div>

        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {title}
        </h1>

        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Workspace Manager • Stay productive together
        </p>

      </div>

      {/* Center - Search Bar */}

      <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg px-4 py-2.5 w-[420px] transition focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white dark:focus-within:bg-slate-600">

        <Search
          size={18}
          className="text-slate-400 dark:text-slate-500"
        />

        <input
          type="text"
          placeholder="Search tasks, workspaces..."
          className="bg-transparent outline-none ml-3 flex-1 text-sm text-slate-700 dark:text-slate-300 placeholder-slate-500 dark:placeholder-slate-400"
        />

      </div>

      {/* Right - Notifications, Dark Mode & Profile */}

      <div className="flex items-center gap-4">

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition"
          title={darkMode ? "Light mode" : "Dark mode"}
        >
          {darkMode ? (
            <Sun size={20} className="text-yellow-500" />
          ) : (
            <Moon size={20} className="text-slate-600" />
          )}
        </button>

        <Link
          to="/notifications"
          className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition"
          title="Notifications"
        >

          <Bell
            size={20}
            className="text-slate-600 dark:text-slate-400 hover:text-blue-600 transition"
          />

          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>

        </Link>

        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700"></div>

        <Link
          to="/profile"
          className="flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg px-2 py-1.5 transition"
        >

          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shadow-md">

            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : "U"}

          </div>

          <div className="hidden md:block">

            <h3 className="font-semibold text-slate-800 dark:text-white text-sm">
              {user?.name || "User"}
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-xs">
              {user?.email || ""}
            </p>

          </div>

        </Link>

      </div>

    </header>
  );
}

export default Navbar;