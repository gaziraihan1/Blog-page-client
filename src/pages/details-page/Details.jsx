import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
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
    category
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
      <div className="my-10 flex justify-center items-center max-w-3xl mx-auto">
        <Skeleton width={250} count={6} />
      </div>
    );
  }

  return (
    <div className="my-8 flex justify-center items-center max-w-3xl mx-auto">
      <div className="p-4 border border-base-300 rounded w-full">
        <img
          src={image_url}
          alt={title}
          className="w-full h-auto object-cover rounded mb-4"
        />

        <div className="flex flex-wrap items-center gap-2 py-2 border-b border-base-300">
          <img
            src={writer_photo}
            className="w-12 h-12 object-cover rounded-full p-1 border-2 border-gray-200"
            alt="Writer"
          />
          <h4 className="text-sm font-medium text-gray-600">{writer_name}</h4>
        </div>

        <h1 className="mt-2 text-lg lg:text-2xl font-semibold capitalize">{title}</h1>

        <div className="text-xs mt-1.5">
          <span className="bg-blue-500 text-white/70 py-0.5 px-3 rounded-3xl capitalize">
            {category}
          </span>
        </div>

        <p className="py-1 lg:text-lg inline-block border-b border-gray-100 italic mt-1">
          "{short_description}"
        </p>

        <p className="text-sm md:text-base py-4 text-gray-600 border-b border-gray-200">
          {description}
        </p>
        {
          user.email === email && <Link to={`/blog/update/${_id}`}>Update Blog</Link>
        }
        <div>
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
              <Skeleton width={200} count={3} />
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
