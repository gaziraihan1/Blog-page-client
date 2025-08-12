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
      .post("https://assignment-11-server-beige.vercel.app/wishlist", wishlistItem)
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
    <section className="my-16 2xl:my-28 px-4">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-base-content">
          📰 Recent Blogs
        </h2>
        <p className="mt-2 text-base text-base-content/70">
          Stay updated with the latest posts from our community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
        {data.length > 0 &&
          data.map((item) =>
            loading ? (
              <div key={item._id} className="flex justify-center items-center">
                <Skeleton width={250} count={8} />
              </div>
            ) : (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.4 }}
                className="flex flex-col justify-between rounded-2xl bg-base-100 border border-base-300 shadow-lg hover:shadow-xl overflow-hidden transition"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={item.image_url}
                    alt="Blog"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="flex flex-col flex-grow p-5">
                  <h3 className="text-lg font-semibold text-base-content mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-base-content/70 mb-3 line-clamp-3">
                    {item.short_description}
                  </p>
                  <span className="bg-primary/20 text-primary px-3 py-1 text-xs rounded-full w-fit mb-4 uppercase tracking-wide">
                    {item.category}
                  </span>

                  <div className="flex gap-3 mt-auto">
                    {user?.email && (
                      <button
                        onClick={() => handleAddWishlist(item)}
                        className="btn btn-sm btn-primary"
                      >
                        ❤️ Wishlist
                      </button>
                    )}
                    <Link
                      to={`/details/${item._id}`}
                      className="btn btn-sm btn-outline"
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
    </section>
  );
};

export default RecentBlog;
