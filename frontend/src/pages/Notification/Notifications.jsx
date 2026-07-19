import { useEffect } from "react";

import socket from "../../socket";

import {
  useGetNotificationsQuery,
} from "../../redux/slices/apiSlice";

import NotificationCard from "./NotificationCard";

function Notifications() {
  const {
    data,
    isLoading,
    refetch,
  } = useGetNotificationsQuery();

  useEffect(() => {
    socket.on("receiveNotification", () => {
      refetch();
    });

    return () => {
      socket.off("receiveNotification");
    };
  }, [refetch]);

  const notifications =
    data?.notifications || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
        Notifications
      </h1>

      {notifications.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-10 text-center text-slate-600 dark:text-slate-400">

          No Notifications

        </div>
      ) : (
        notifications.map((notification) => (
          <NotificationCard
            key={notification._id}
            notification={notification}
          />
        ))
      )}

    </div>
  );
}

export default Notifications;