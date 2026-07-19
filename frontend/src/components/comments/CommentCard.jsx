function CommentCard({ comment }) {
  return (
    <div className="border rounded-lg p-4">

      <div className="flex justify-between">

        <h3 className="font-semibold">
          {comment.user?.name || "Unknown User"}
        </h3>

        <span className="text-sm text-gray-500">
          {new Date(comment.createdAt).toLocaleString()}
        </span>

      </div>

      <p className="mt-3 text-gray-700">
        {comment.comment}
      </p>

    </div>
  );
}

export default CommentCard;