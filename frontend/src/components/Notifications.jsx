import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
import { FaBell } from "react-icons/fa";

const socket = io("http://localhost:5000");

const NotificationBell = ({ currentUser }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();

    socket.emit("joinUserRoom", currentUser._id);

    socket.on("newNotification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      socket.off("newNotification");
    };
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/notifications/${currentUser._id}`
      );

      setNotifications(res.data.notifications || []);
    } catch (error) {
      console.error(error);
    }
  };

  const markAllRead = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/notifications/read-all/${currentUser._id}`
      );

      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          isRead: true,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-full hover:bg-slate-100 transition"
      >
        <FaBell size={22} />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[20px] h-5 rounded-full flex items-center justify-center px-1">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-3 w-[380px] bg-white shadow-2xl rounded-2xl border z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-bold text-lg">
                Notifications
              </h3>

              <button
                onClick={markAllRead}
                className="text-blue-600 text-sm hover:underline"
              >
                Mark all read
              </button>
            </div>

            <div className="max-h-[450px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No notifications
                </div>
              ) : (
                notifications.map((item) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-4 border-b cursor-pointer hover:bg-slate-50 transition ${
                      !item.isRead
                        ? "bg-blue-50"
                        : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      <div
                        className={`w-3 h-3 rounded-full mt-2 ${
                          !item.isRead
                            ? "bg-blue-600"
                            : "bg-gray-300"
                        }`}
                      />

                      <div className="flex-1">
                        <p className="text-sm text-slate-700">
                          {item.message}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(
                            item.createdAt
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;