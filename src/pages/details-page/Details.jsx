import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import useDetailsApi from "./useDetailsApi";
import { AuthContext } from "../../Context/AuthProvider";
import TextArea from "../../components/textarea-filed/TextArea";

const Details = () => {
  const { detailsDataApi } = useDetailsApi();
  const { id: _id } = useParams();
  const [details, setDetails] = useState({});
  const { user } = useContext(AuthContext);
  const {
    title,
    image_url,
    short_description,
    description,
    writer_name,
    writer_photo,
    email
  } = details;

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

  return (
    <div className="my-8 flex justify-center items-center max-w-3xl mx-auto">
      <div className="p-4 border border-base-300 rounded">
        <img src={image_url} alt="" className="rounded" />
        <div className="flex flex-wrap items-center gap-2 py-2 border-b border-base-300">
          <img
            src={writer_photo}
            className="w-12 h-12 object-cover rounded-full p-1 border-2 border-gray-200"
            alt=""
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
          {
            user.email === email ? <h2 className="text-red-600 font-medium py-4 border-b-3 border-gray-300">Can not comment on own blog</h2>: <TextArea id={_id}/>
          }
        </div>
      </div>
    </div>
  );
};

export default Details;
