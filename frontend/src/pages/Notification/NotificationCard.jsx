function NotificationCard({ notification }) {
  return (
    <div className="bg-white dark:bg-slate-800 shadow dark:shadow-md rounded-xl p-5 border-l-4 border-blue-600 dark:border-blue-500">

      <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
        {notification.message}
      </h3>

      <p className="text-gray-500 dark:text-gray-400 mt-2">
        {new Date(notification.createdAt).toLocaleString()}
      </p>

    </div>
  );
}

export default NotificationCard;