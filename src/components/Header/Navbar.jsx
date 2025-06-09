import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import { Link, NavLink, useNavigate } from "react-router";
import { AlignRight, X } from "lucide-react";
import Skeleton from "react-loading-skeleton";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const { logOut, user, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut().then(() => {
      navigate("/");
    });
  };

  return (
    <nav className="flex justify-between lg:w-11/12 mx-auto 2xl:w-10/12 items-center px-4 py-2 md:px-6 xl:px-8 xl:py-6 md:py-4 rounded-3xl xl:rounded-4xl shadow-[0px_0px_6px_1px_rgba(215,_218,_216,_0.91)] xl:my-2 max-w-7xl">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold lg:text-2xl text-gray-500">
          Ultra <span className="text-gray-500">BLOG</span>
        </h2>
      </div>
      <div className="lg:hidden" onClick={() => setMenu(!menu)}>
        {menu ? (
          <X className="cursor-pointer" />
        ) : (
          <AlignRight className="cursor-pointer" />
        )}
      </div>
      <ul
        className={`flex bg-slate-300 text-gray-600 flex-col gap-4 absolute p-6 rounded-lg ${
          menu ? "top-16 right-2" : "hidden"
        } lg:hidden text-center z-10`}
      >
        {user && (
          <li className="flex justify-center items-center">
            <img src={user?.photoURL}
              className="w-10 h-10 rounded-full"
              alt="User"
            />
          </li>
        )}
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/add-blog"}>Add Blog</NavLink>
        </li>
        <li>
          <NavLink to={"/all-blogs"}>All Blogs</NavLink>
        </li>
        <li>
          <NavLink to={"/featured-blogs"}>Featured Blogs</NavLink>
        </li>
        <li>
          <NavLink to={"/wishlist"}>Wishlist</NavLink>
        </li>

        {user ? (
          <>
            <li className="py-1 rounded-2xl border border-red-500 hover:text-gray-700">
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="py-1 px-4 rounded-2xl border border-gray-500 hover:text-gray-700">
              <Link to="/auth/login">Login</Link>
            </li>
            <li className="py-1 px-4 rounded-2xl border border-gray-500 hover:text-gray-700">
              <Link to="/auth/register">Register</Link>
            </li>
          </>
        )}
      </ul>
      <ul className="hidden lg:flex gap-6 xl:gap-8 2xl:gap-12 text-lg font-medium text-gray-500">
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/add-blog"}>Add Blog</NavLink>
        </li>
        <li>
          <NavLink to={"/all-blogs"}>All Blogs</NavLink>
        </li>
        <li>
          <NavLink to={"/featured-blogs"}>Featured Blogs</NavLink>
        </li>
        <li>
          <NavLink to={`/wishlist`}>Wishlist</NavLink>
        </li>
      </ul>
      <div className="hidden lg:block">
        {loading ? (
          <div className="flex justify-center items-center">
            <Skeleton height={20} width={200} />
          </div>
        ) : user ? (
          <div className="flex gap-2">
            <img src={user?.photoURL}
              className="w-10 h-10 rounded-full"
              alt="User"
            />
            <button
              className="py-1 px-7 border border-gray-600 rounded-4xl cursor-pointer text-gray-600 hover:text-gray-500"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="/auth/login">
              <button className="bg-blue-600 text-white px-6 py-2 rounded">
                Login
              </button>
            </Link>
            <Link to="/auth/register">
              <button className="bg-blue-800 text-white px-6 py-2 rounded">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
