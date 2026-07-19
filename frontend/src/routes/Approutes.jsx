import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "../components/layout/Layout";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

import Dashboard from "../pages/Dashboard/Dashboard";
import Workspace from "../pages/Workspace/Workspace";
import Board from "../pages/Board/Board";
import Task from "../pages/Task/Task";
import TaskDetails from "../pages/Task/TaskDetails";
import Notifications from "../pages/Notification/Notifications";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";

function AppRoutes() {
  return (

      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Protected Application */}

        <Route element={<Layout />}>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/workspaces" element={<Workspace />} />

          <Route path="/boards/:workspaceId" element={<Board />} />

          <Route path="/tasks/:boardId" element={<Task />} />

          <Route path="/task/:taskId" element={<TaskDetails />} />

          <Route path="/notifications" element={<Notifications />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/settings" element={<Settings />} />

        </Route>

      </Routes>

    
  );
}

export default AppRoutes;