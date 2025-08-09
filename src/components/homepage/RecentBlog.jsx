import React, { useContext } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import Skeleton from "react-loading-skeleton";
import { AuthContext } from "../../Context/AuthProvider";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const RecentBlog = ({ data }) => {
  const { loading, user } = useContext(AuthContext);

  const handleAddWishlist = (item) => {
    const wishlistItem = {
      ...item,
      loggedEmail: user.email,
    };

    axios
      .post(
        "https://assignment-11-server-beige.vercel.app/wishlist",
        wishlistItem
      )
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
    <div className="my-10 md:my-12 lg:my-16 2xl:my-20">
      <h2 className="text-2xl xl:text-3xl font-semibold dark:text-gray-300">Recent Blog</h2>
      <div className="mt-4 md:mt-6 lg:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 auto-rows-fr">
        {data.length > 0 &&
          data.map((item) =>
            loading ? (
              <div key={item._id} className="flex justify-center items-center">
                <Skeleton width={250} count={8} />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, amount: 0.5 }}
                key={item._id}
                className="flex flex-col justify-between backdrop-blur-md bg-white/5 border dark:border-gray-600 dark:shadow-[1px_1px_8px] dark:shadow-gray-600 border-gray-300 text-slate-700 rounded-xl shadow-lg p-4 h-full"
              >
                <div className="h-48 overflow-hidden rounded-md mb-4">
                  <img
                    src={item.image_url}
                    alt="Blog"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col flex-grow">
                  <div className="text-xl text-base-content font-semibold mb-2">
                    {item.title.length > 50
                      ? `${item.title.slice(0, 50)}...`
                      : item.title}
                  </div>
                  <div className="text-sm text-base-content mb-2">
                    {item.short_description.length > 63
                      ? `${item.short_description.slice(0, 63)}...`
                      : item.short_description}
                  </div>
                  <span className="bg-blue-700 inline-block px-3 rounded py-0.5 text-xs text-white/80 uppercase mb-3 w-max">
                    {item.category}
                  </span>

                  <div className="flex gap-3 mt-auto">
                    {user.email && (
                      <button
                        onClick={() => handleAddWishlist(item)}
                        className="px-4 py-2 text-sm text-white rounded-md bg-cyan-500 hover:bg-cyan-600 transition"
                      >
                        Add Wishlist
                      </button>
                    )}
                    <Link
                      to={`/details/${item._id}`}
                      className="px-4 py-2 text-sm rounded-md bg-slate-200 hover:bg-slate-300 transition"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default RecentBlog;
