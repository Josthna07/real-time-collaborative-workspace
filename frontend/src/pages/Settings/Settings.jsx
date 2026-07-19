import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LogOut, Moon, Sun, Mail, User as UserIcon, Lock, Globe } from "lucide-react";
import { useState, useEffect } from "react";

import { logout } from "../../redux/slices/authSlice";

function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [darkMode]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-slate-100 -m-6 p-8">

      {/* Hero */}

      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 p-10 shadow-xl mb-8">

        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-white/10"></div>

        <div className="absolute bottom-0 left-1/2 w-60 h-60 rounded-full bg-white/5"></div>

        <div className="relative z-10 flex items-center justify-between">

          <div>

            <p className="uppercase tracking-[5px] text-blue-100 font-semibold text-sm">
              Workspace Manager
            </p>

            <h1 className="text-5xl font-extrabold text-white mt-4">
              Settings
            </h1>

            <p className="text-blue-100 text-lg mt-4 max-w-2xl">
              Manage your account, appearance and security preferences from one place.
            </p>

          </div>

          <div className="hidden lg:flex">

            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 text-center">

              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-3xl font-bold text-blue-600 mx-auto">

                {user?.name?.charAt(0).toUpperCase()}

              </div>

              <h3 className="text-white font-bold mt-4 text-xl">
                {user?.name}
              </h3>

              <p className="text-blue-100 text-sm">
                {user?.email}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Account Settings Card */}

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 overflow-hidden mb-6">

        <div className="p-8">

          <div className="flex items-center gap-3 mb-6">
            <UserIcon size={28} className="text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Account Information
            </h2>
          </div>

          <div className="space-y-6">

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Full Name
              </label>
              <input
                type="text"
                value={user?.name || ""}
                disabled
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white font-medium cursor-not-allowed opacity-75"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                <Mail size={16} />
                Email Address
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white font-medium cursor-not-allowed opacity-75"
              />
            </div>

            {/* Joined Date */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Member Since
              </label>
              <input
                type="text"
                value={new Date(user?.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }) || "Recently"}
                disabled
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white font-medium cursor-not-allowed opacity-75"
              />
            </div>

          </div>

        </div>

      </div>

      {/* Display Settings Card */}

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 overflow-hidden mb-6">

        <div className="p-8">

          <div className="flex items-center gap-3 mb-6">
            <Globe size={28} className="text-purple-600 dark:text-purple-400" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Display Preferences
            </h2>
          </div>

          <div className="space-y-4">

            {/* Dark Mode Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600">

              <div className="flex items-center gap-3">

                {darkMode ? (
                  <Moon size={20} className="text-slate-600 dark:text-slate-300" />
                ) : (
                  <Sun size={20} className="text-slate-600 dark:text-slate-300" />
                )}

                <div>

                  <p className="font-semibold text-slate-900 dark:text-white">
                    Dark Mode
                  </p>

                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {darkMode ? "Enabled" : "Disabled"}
                  </p>

                </div>

              </div>

              {/* Toggle Switch */}
              <button
                onClick={toggleDarkMode}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${darkMode ? "bg-blue-600" : "bg-slate-300"
                  }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${darkMode ? "translate-x-7" : "translate-x-1"
                    }`}
                />
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Security Settings Card */}

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-100 dark:border-slate-700 overflow-hidden mb-6">

        <div className="p-8">

          <div className="flex items-center gap-3 mb-6">
            <Lock size={28} className="text-green-600 dark:text-green-400" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Security
            </h2>
          </div>

          <div className="space-y-4">

            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">

              <p className="font-semibold text-green-900 dark:text-green-100 mb-2">
                ✓ Account Secured
              </p>

              <p className="text-sm text-green-800 dark:text-green-200">
                Your account is protected with JWT authentication and password encryption.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Logout Card */}

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-red-100 dark:border-red-900 overflow-hidden">

        <div className="p-8">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                <LogOut size={24} className="text-red-600 dark:text-red-400" />
              </div>

              <div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Logout
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400">
                  End your current session
                </p>

              </div>

            </div>

            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Logout
            </button>

          </div>

          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">

            <p className="text-xs text-red-900 dark:text-red-200">
              You will be returned to the login page. You can log back in anytime with your credentials.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Settings;