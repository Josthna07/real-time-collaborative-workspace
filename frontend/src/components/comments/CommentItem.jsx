function CommentItem({ comment }) {
  return (
    <div className="border rounded-xl p-4 bg-gray-50">

      <div className="flex justify-between items-center">

        <h4 className="font-semibold">
          {comment.user?.name || "Unknown User"}
        </h4>

        <span className="text-xs text-gray-500">
          {new Date(comment.createdAt).toLocaleString()}
        </span>

      </div>

      <p className="mt-3 text-gray-700">
        {comment.comment}
      </p>

    </div>
  );
}

export default CommentItem;