import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { Link } from "react-router";

const AllBlogs = () => {
  const { loading } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("all");
  const [searchedText, setSearchedText] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/blog")
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const matchStartingWord = (title, search) => {
    return title.toLowerCase().startsWith(search.toLowerCase().trim());
  };

  const filteredBlogsByCategoryAndSearch = blogs.filter((item) => {
    const matchedByCategory = category === "all" || item.category === category;
    const title = item.title;
    const matchedBySearch =
      (title && matchStartingWord(title, searchedText)) ||
      searchedText.trim() === "";
    return matchedByCategory && matchedBySearch;
  });

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
            <option value="all">All</option>
            <option value="sports">Sports</option>
            <option value="entertainment">Entertainment</option>
            <option value="tech">Tech</option>
            <option value="lifestyle">Lifestyle</option>
          </select>
        </div>
      </div>

      {/* Render filtered blogs */}
      <div className="mt-8 space-y-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4 ">
        {loading ? (
          <div></div>
        ) : filteredBlogsByCategoryAndSearch.length > 0 ? (
          filteredBlogsByCategoryAndSearch.map((item) =>
            loading ? (
              ""
            ) : (
              <div
                key={item._id}
                className="backdrop-blur-md bg-white/5 border border-white/10 text-slate-100 rounded-xl shadow-lg p-4 max-w-sm transition hover:bg-white/10"
              >
                <img
                  src={item.image_url}
                  alt="Blog"
                  className="rounded-md mb-4"
                />
                <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
                <p className="text-sm text-slate-300 mb-1">
                  {item.short_description}
                </p>
                <span className="text-xs text-cyan-400 block mb-2">{item.category}</span>
                 <div className="flex gap-3">
    <button className="px-4 py-2 text-sm rounded-md bg-cyan-600 hover:bg-cyan-700 transition">
      Add Wishlist
    </button>
    <button className="px-4 py-2 text-sm rounded-md bg-slate-700 hover:bg-slate-800 transition">
      <Link to={`/details/${item._id}`}>
      Details
      </Link>
    </button>
  </div>
              </div>
            )
          )
        ) : (
          <p className="text-center font-mono font-bold lg:text-xl text-gray-400 mt-6 col-span-full">
            No blogs found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllBlogs;
