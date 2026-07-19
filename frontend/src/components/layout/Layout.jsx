import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout() {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900 transition-colors duration-200">

      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">

        <Navbar />

        <main className="flex-1 bg-slate-50 p-8 overflow-y-auto">

          <Outlet />

        </main>

      </div>

    </div>
  );
}

export default Layout;