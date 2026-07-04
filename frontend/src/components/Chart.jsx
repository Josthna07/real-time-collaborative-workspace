import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const normalizePriority = (priority) => (priority || "normal").toLowerCase().trim();

const PRIORITY_ORDER = ["high", "medium", "normal", "low"];

export const Chart = ({ tasks = [] }) => {
  // Count tasks per priority
  const counts = tasks.reduce((acc, task) => {
    const key = normalizePriority(task.priority);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const knownData = PRIORITY_ORDER.map((priority) => ({
    name: priority.charAt(0).toUpperCase() + priority.slice(1),
    total: counts[priority] || 0,
  }));

  const extraKeys = Object.keys(counts).filter(
    (key) => !PRIORITY_ORDER.includes(key),
  );
  const extraData = extraKeys.map((priority) => ({
    name: priority.charAt(0).toUpperCase() + priority.slice(1),
    total: counts[priority],
  }));

  const chartData = [...knownData, ...extraData];

  return (
    <ResponsiveContainer width={"100%"} height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="total" fill="#8884d8" name="Tasks" />
      </BarChart>
    </ResponsiveContainer>
  );
};