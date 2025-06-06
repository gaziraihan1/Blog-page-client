import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const TextArea = ({ id, setAllComment }) => {
  const { id: _id } = id;
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");
  const data = {
    comment,
    email: user.email,
    name: user.displayName,
    user_photo: user.photoURL,
    blog_id: id,
  };
  const submitComment = () => {
    if(comment){

      axios.post("http://localhost:3000/comment", data).then((res) => {
        if (res.data.insertedId) {
          toast.success("Comment sent successful");
  
          setAllComment((prev) => [
            ...prev,
            {
              _id: res.data.insertedId,
              ...data,
            },
          ]);
          setComment("");
        } else {
          toast.error("Comment not sent!");
        }
      });
    }
    else{
      toast.error('write something before comment')
    }
    setComment("");
  };
  return (
    <div className="p-4">
      <fieldset className="fieldset border-base-100 rounded-box border col-span-full">
        <textarea
          type="text"
          name="comment"
          className=" w-full resize-none p-2 border border-gray-200 focus:outline-none rounded"
          value={comment}
          placeholder="Comment..."
          resize="none"
          rows="2"
          required
          onChange={(e) => setComment(e.target.value)}
        />
      </fieldset>
      <button onClick={submitComment} className="btn btn-primary my-2">
        Comment
      </button>
      <ToastContainer />
    </div>
  );
};

export default TextArea;
