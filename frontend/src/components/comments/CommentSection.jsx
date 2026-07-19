import { useEffect } from "react";

import socket from "../../socket";

import {
  useGetCommentsQuery,
} from "../../redux/slices/apiSlice";

import CommentCard from "./CommentCard";
import CommentInput from "./CommentInput";

function CommentSection({ taskId }) {
  const {
    data,
    isLoading,
    refetch,
  } = useGetCommentsQuery(taskId);

  useEffect(() => {
    socket.on("receiveComment", () => {
      refetch();
    });

    return () => {
      socket.off("receiveComment");
    };
  }, [refetch]);

  const comments = data?.comments || [];

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Comments
      </h2>

      <CommentInput
        taskId={taskId}
        onSuccess={refetch}
      />

      <div className="mt-8 space-y-4">

        {isLoading ? (
          <p>Loading...</p>
        ) : comments.length === 0 ? (
          <p className="text-gray-500">
            No comments yet.
          </p>
        ) : (
          comments.map((comment) => (
            <CommentCard
              key={comment._id}
              comment={comment}
            />
          ))
        )}

      </div>

    </div>
  );
}

export default CommentSection;