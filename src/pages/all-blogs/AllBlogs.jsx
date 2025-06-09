import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { Link } from "react-router";
import Skeleton from "react-loading-skeleton";
import { toast, ToastContainer } from "react-toastify";

const AllBlogs = () => {
  const { loading, user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("");
  const [searchedText, setSearchedText] = useState("");

  const fetchAllBlog = () => {
    const params = {};
    if (category) {
      params.category = category;
    }
    if (searchedText) {
      params.searchedText = searchedText;
    }

    axios.get("http://localhost:3000/blog", { params }).then((res) => setBlogs(res.data));
  };

  useEffect(() => {
    fetchAllBlog();
  }, [category, searchedText]);

  const handleAddWishlist = (item) => {
    const wishlistItem = {
      ...item,
      loggedEmail: user.email,
    };

    axios
      .post("http://localhost:3000/wishlist", wishlistItem)
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("✅ Added to wishlist.");
        } else if (res.data.insertedId === false) {
          toast.error("⚠️ Already in wishlist.");
        } else {
          toast.error("❌ Could not add to wishlist.");
        }
      })
      .catch(() => {
        toast.error("❌ Server error. Try again later.");
      });
  };

  return (
    <div className="my-8">
      <div className="flex justify-center items-center flex-col sm:flex-row gap-4">
        <input
          type="search"
          placeholder="Search blogs..."
          onChange={(e) => setSearchedText(e.target.value)}
          className="input input-bordered w-full sm:w-1/2"
        />
        <select
          name="category"
          onChange={(e) => setCategory(e.target.value)}
          required
          className="select select-bordered w-full sm:w-1/3"
        >
          <option value="">Select category</option>
          <option value="sports">Sports</option>
          <option value="entertainment">Entertainment</option>
          <option value="tech">Tech</option>
          <option value="lifestyle">Lifestyle</option>
        </select>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
        {loading ? (
          <div className="col-span-full flex justify-center items-center min-h-[70vh]">
            <Skeleton width={300} count={8} />
          </div>
        ) : (
          blogs.length > 0 &&
          blogs.map((item) => (
            <div
              key={item._id}
              className="flex flex-col justify-between backdrop-blur-md bg-white/5 border border-gray-300 text-slate-700 rounded-xl shadow-lg p-4 h-full"
            >
              <div className="h-48 overflow-hidden rounded-md mb-4">
                <img
                  src={item.image_url}
                  alt="Blog"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col flex-grow">
                <div className="text-xl font-semibold mb-2">
                  {item.title.length > 50 ? `${item.title.slice(0, 50)}...` : item.title}
                </div>
                <div className="text-sm text-slate-500 mb-2">
                  {item.short_description.length > 63
                    ? `${item.short_description.slice(0, 63)}...`
                    : item.short_description}
                </div>
                <span className="bg-blue-700 inline-block px-3 rounded py-0.5 text-xs text-white/80 uppercase mb-3 w-max">
                  {item.category}
                </span>

                <div className="flex gap-3 mt-auto">
                  <button
                        onClick={() => handleAddWishlist(item)}
                        className="px-4 py-2 text-sm text-white rounded-md bg-cyan-500 hover:bg-cyan-600 transition"
                      >
                        Add Wishlist
                      </button>
                  <Link
                    to={`/details/${item._id}`}
                    className="px-4 py-2 text-sm rounded-md bg-slate-200 hover:bg-slate-300 transition"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default AllBlogs;
