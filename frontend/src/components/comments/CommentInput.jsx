import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import {
  useCreateCommentMutation,
} from "../../redux/slices/apiSlice";
import socket from "../../socket";
function CommentInput({
  taskId,
  onSuccess,
}) {
  const [comment, setComment] = useState("");

  const [createComment, { isLoading }] =
    useCreateCommentMutation();

  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return;

    try {
      await createComment({
        task: taskId,
        comment,
        user: user._id,
      }).unwrap();

      socket.emit("sendComment", {
        task: taskId,
        user,
        comment,
        });

      setComment("");
      onSuccess();

      onSuccess();
    } catch (err) {
      toast.error(
        err?.data?.message ||
          "Failed to add comment"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-4"
    >

      <input
        className="flex-1 border rounded-lg p-3"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
      />

      <button
        disabled={isLoading}
        className="bg-blue-600 text-white px-6 rounded-lg"
      >
        {isLoading ? "Posting..." : "Post"}
      </button>

    </form>
  );
}

export default CommentInput;