import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

const socket = io("http://localhost:5000");

const Comments = ({ taskId, currentUser }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [typingUser, setTypingUser] = useState("");

  const commentsEndRef = useRef(null);

  useEffect(() => {
    fetchComments();

    socket.emit("joinTask", taskId);

    socket.on("newComment", (newComment) => {
      setComments((prev) => [...prev, newComment]);
    });

    socket.on("userTyping", (name) => {
      setTypingUser(name);

      setTimeout(() => {
        setTypingUser("");
      }, 2000);
    });

    return () => {
      socket.off("newComment");
      socket.off("userTyping");
    };
  }, [taskId]);

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [comments]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/comments/${taskId}`
      );

      setComments(res.data.comments || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTyping = () => {
    socket.emit("typing", {
      taskId,
      user: currentUser.name,
    });
  };

  const sendComment = async () => {
    if (!comment.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/comments",
        {
          taskId,
          text: comment,
          userId: currentUser._id,
        }
      );

      socket.emit("commentAdded", {
        taskId,
        comment: res.data.comment,
      });

      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-slate-800">
          Comments ({comments.length})
        </h2>
      </div>

      {/* Comment List */}
      <div className="max-h-[450px] overflow-y-auto space-y-4 pr-2">
        <AnimatePresence>
          {comments.map((item, index) => (
            <motion.div
              key={item._id || index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                {item.user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div className="flex-1">
                <div className="bg-slate-50 border rounded-xl p-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-slate-800">
                      {item.user?.name || "User"}
                    </h4>

                    <span className="text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <p className="mt-2 text-slate-700">{item.text}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <div ref={commentsEndRef} />
      </div>

      {/* Typing Indicator */}
      {typingUser && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-500 mt-3"
        >
          {typingUser} is typing...
        </motion.div>
      )}

      {/* Input */}
      <div className="mt-5 flex gap-3">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={handleTyping}
          placeholder="Write a comment..."
          className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={sendComment}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl flex items-center gap-2"
        >
          <FaPaperPlane />
          Send
        </motion.button>
      </div>
    </div>
  );
};

export default Comments;