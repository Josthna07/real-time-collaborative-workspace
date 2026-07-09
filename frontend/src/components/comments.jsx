import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";
import socket from "../socket";


const Comments = ({ taskId, currentUser }) => {

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const commentsEndRef = useRef(null);


  // Fetch comments + socket listener
  useEffect(() => {

    const fetchComments = async () => {
      try {

        const res = await axios.get(
          `http://localhost:5000/api/comments/${taskId}`
        );

        setComments(res.data.comments || []);

      } catch (error) {

        console.error(
          "Error fetching comments:",
          error
        );

      }
    };


    fetchComments();


    socket.on(
      "receiveComment",
      (newComment) => {

        if(newComment.task === taskId){

          setComments((prev)=>{

            const exists = prev.some(
              (item)=>item._id === newComment._id
            );

            if(exists){
              return prev;
            }

            return [
              ...prev,
              newComment
            ];

          });

        }

      }
    );


    return () => {

      socket.off(
        "receiveComment"
      );

    };


  }, [taskId]);



  // Auto scroll
  useEffect(()=>{

    commentsEndRef.current?.scrollIntoView({
      behavior:"smooth"
    });

  },[comments]);



  // Send comment
  const sendComment = async()=>{

    if(!comment.trim()) return;


    try{

      await axios.post(
        "http://localhost:5000/api/comments",
        <Comments
           taskId={task._id}
            currentUser={{
            _id: "6870abc123456789def12345",
           name: "Srushti"
      }}
/>
      );


      setComment("");


    }catch(error){

      console.error(
        "Error sending comment:",
        error
      );

    }

  };



  return (

    <div className="bg-white rounded-2xl shadow-lg border p-6">


      <h2 className="text-xl font-bold text-slate-800 mb-5">
        Comments ({comments.length})
      </h2>



      <div className="max-h-[450px] overflow-y-auto space-y-4 pr-2">


        <AnimatePresence>

          {comments.map((item,index)=>(

            <motion.div

              key={item._id || index}

              initial={{
                opacity:0,
                y:15
              }}

              animate={{
                opacity:1,
                y:0
              }}

              transition={{
                duration:0.25
              }}

              className="flex gap-3"

            >


              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">

                {
                  item.user?.name
                  ?.charAt(0)
                  ?.toUpperCase()
                  ||
                  "U"
                }

              </div>



              <div className="flex-1">

                <div className="bg-slate-50 border rounded-xl p-3">


                  <div className="flex justify-between">

                    <h4 className="font-semibold text-slate-800">

                      {
                        item.user?.name ||
                        "User"
                      }

                    </h4>


                    <span className="text-xs text-gray-500">

                      {
                        new Date(
                          item.createdAt
                        ).toLocaleString()
                      }

                    </span>


                  </div>



                  <p className="mt-2 text-slate-700">
                    {item.comment}
                  </p>


                </div>

              </div>


            </motion.div>

          ))}

        </AnimatePresence>


        <div ref={commentsEndRef}/>


      </div>




      <div className="mt-5 flex gap-3">


        <input

          type="text"

          value={comment}

          onChange={(e)=>setComment(e.target.value)}

          placeholder="Write a comment..."

          className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"

        />



        <motion.button

          whileHover={{
            scale:1.05
          }}

          whileTap={{
            scale:0.95
          }}

          onClick={sendComment}

          className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-xl flex items-center gap-2"

        >

          <FaPaperPlane/>

          Send

        </motion.button>


      </div>


    </div>

  );

};


export default Comments;