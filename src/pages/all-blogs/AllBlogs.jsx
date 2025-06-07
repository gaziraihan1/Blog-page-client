import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { Link } from "react-router";
import Skeleton from "react-loading-skeleton";

const AllBlogs = () => {
  const { loading } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("");
  const [searchedText, setSearchedText] = useState("");

  const fetchAllBlog = () => {

      const params = {};
      if(category) {
        params.category = category
      }
      if(searchedText) {
        params.searchedText = searchedText
      }

      axios.get('http://localhost:3000/blog', {params}).then(res => setBlogs(res.data));
  }

  useEffect(() => {
    fetchAllBlog();
  }, [category, searchedText]);

  return (
    <div className="my-8">
      <div className="flex justify-center items-center flex-col sm:flex-row gap-2 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-8">
        <div className="w-full">
          <input
            type="search"
            placeholder="Search blogs..."
            onChange={(e) => setSearchedText(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="w-full sm:w-[40%]">
          <select
            name="category"
            onChange={(e) => setCategory(e.target.value)}
            required
            className="select select-bordered w-full"
          >
            <option value="">Select category</option>
            <option value="sports">Sports</option>
            <option value="entertainment">Entertainment</option>
            <option value="tech">Tech</option>
            <option value="lifestyle">Lifestyle</option>
          </select>
        </div>
      </div>

      <div className="mt-8 space-y-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 ">
        {loading ? (
          <div className="col-span-full flex justify-center items-center min-h-[70vh]">
            <Skeleton width={300} count={8}/>
          </div>
        ) : (
          blogs.length > 0 &&
          blogs.map((item) =>
            loading ? (
              <div className="">
                <Skeleton width={200} count={4}/>
              </div>
            ) : (
              <div
                key={item._id}
                className="backdrop-blur-md bg-white/5 border border-gray-300 text-slate-700 rounded-xl shadow-lg p-4 max-w-sm mx-auto transition hover:bg-white/10"
              >
                <img
                  src={item.image_url}
                  alt="Blog"
                  className="rounded-md mb-4 max-h-52"
                />
                <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
                <p className="text-sm text-slate-500 mb-1">
                  {item.short_description}
                </p>
                <span className="bg-blue-700 inline-block px-3 rounded py-0.5 text-xs text-white/80 uppercase mb-2">
                  {item.category}
                </span>
                <div className="flex gap-3">
                  <button className="px-4 py-2 text-sm text-white/90 rounded-md bg-cyan-500 hover:bg-cyan-600 transition">
                    Add Wishlist
                  </button>
                  <button className="px-4 py-2 text-sm rounded-md bg-slate-200 hover:bg-slate-300 transition">
                    <Link to={`/details/${item._id}`}>Details</Link>
                  </button>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
