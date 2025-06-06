import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import useDetailsApi from "./useDetailsApi";
import { AuthContext } from "../../Context/AuthProvider";
import TextArea from "../../components/textarea-filed/TextArea";
import axios from "axios";

const Details = () => {
  const { detailsDataApi } = useDetailsApi();
  const { id: _id } = useParams();
  const [details, setDetails] = useState({});

  const { user, loading } = useContext(AuthContext);
  const [allComment, setAllComment] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/comment")
      .then((res) => setAllComment(res.data));
  }, []);
  const specificBlogComment = allComment.filter(
    (comment) => comment.blog_id === _id
  );

  const {
    title,
    image_url,
    short_description,
    description,
    writer_name,
    writer_photo,
    email,
  } = details || {};

  useEffect(() => {
    if (_id) {
      detailsDataApi(_id)
        .then((res) => {
          setDetails(res);
        })
        .catch((err) => {
          console.error("Error fetching details:", err);
        });
    }
  }, [_id, detailsDataApi]);

  if (!details?.title) {
    return (
      <div className="my-10 text-center">
        <h2 className="text-lg font-semibold text-gray-500">
          Loading blog details...
        </h2>
      </div>
    );
  }

  return (
    <div className="my-8 flex justify-center items-center max-w-3xl mx-auto">
      <div className="p-4 border border-base-300 rounded">
        <img src={image_url} alt="" className="rounded" />

        <div className="flex flex-wrap items-center gap-2 py-2 border-b border-base-300">
          <img
            src={writer_photo }
            className="w-12 h-12 object-cover rounded-full p-1 border-2 border-gray-200"
            alt="Writer"
          />
          <h4 className="text-sm font-medium text-gray-600">{writer_name}</h4>
        </div>

        <h1 className="my-2 text-lg lg:text-2xl font-semibold">{title}</h1>
        <p className="py-1 lg:text-lg inline-block border-b border-gray-100">
          {short_description}
        </p>
        <p className="text-sm md:text-base py-4 text-gray-600 border-b border-gray-200">
          {description}
        </p>

        <div className="mx-4">
          {user?.email === email ? (
            <h2 className="text-red-600 font-medium py-4 border-gray-300">
              Can not comment on own blog
            </h2>
          ) : (
            <TextArea id={_id} setAllComment={setAllComment} />
          )}
        </div>

        <div className="my-2 py-2 border-t-2 border-gray-700">
          <h2 className="font-semibold">Comments</h2>
          <div className="mt-1 flex flex-col gap-3">
            {loading ? (
              <h2>Loading...</h2>
            ) : specificBlogComment.length < 1 ? (
              <h3>No comments yet</h3>
            ) : (
              specificBlogComment.map((comment) => (
                <div
                  key={comment._id}
                  className="flex gap-2 border-b-2 py-2 border-gray-300 sm:w-[80%] lg:w-[65%]"
                >
                  <div>
                    <img
                      src={comment.user_photo}
                      className="w-8 h-8 rounded-full border border-gray-200 p-1"
                      alt=""
                    />
                  </div>
                  <div className="bg-gray-100 w-full px-2 rounded">
                    <h3 className="text-sm font-medium">{comment.name}</h3>
                    <p className="text-sm">{comment.comment}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
