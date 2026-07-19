function LoadingSpinner({
  text = "Loading...",
  fullScreen = false,
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen ? "min-h-screen" : "py-20"
      }`}
    >
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-5 text-gray-500 font-medium">
        {text}
      </p>
    </div>
  );
}

export default LoadingSpinner;