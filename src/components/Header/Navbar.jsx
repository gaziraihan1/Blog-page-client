import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { Link, NavLink, useNavigate } from 'react-router';
import { AlignRight, X } from 'lucide-react';

const Navbar = () => {
 const [menu, setMenu] = useState(false);
  const { logOut, user
, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut().then(() => {
      navigate('/')
    });
  };



  return (
    <nav className="flex justify-between lg:w-11/12 mx-auto 2xl:w-10/12 items-center">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold lg:text-3xl text-gray-900" >
          My<span className="text-gray-600">BLOG</span>
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
        {
          user && <li className="flex justify-center items-center">
              <div>
              
                <img
                  className="w-10 h-10 rounded-full"
                  src={user.photoURL}
                  alt="User"
                />
            </div>
            </li> 
        }
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        
        {user ? (
          <>
            
            <li className="py-1 rounded-2xl border border-red-500 hover:text-gray-700">
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className="py-1 rounded-2xl border border-gray-500 hover:text-gray-700">
              <Link to="/auth/login">Login</Link>
            </li>
            <li className="py-1 rounded-2xl border border-gray-500 hover:text-gray-700">
              <Link to="/auth/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
      <ul className="hidden lg:flex gap-6 xl:gap-8 2xl:gap-12 text-lg font-medium text-gray-600">
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        
      </ul>
      <div className="hidden lg:block">
        {loading ? (
          <span className="border-2 h-1 w-1 p-2 rounded-full"></span>
        ) : user ? (
          <div className="flex gap-2">
            <div>
              <a
                data-tooltip-id="my-tooltip"
                data-tooltip-content={user.displayName}
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={user.photoURL}
                  alt="User"
                />
              </a>
              <Tooltip id="my-tooltip" />
            </div>
            <button
              className="py-1 px-7 border rounded-4xl cursor-pointer text-gray-900"
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
            <Link to="/auth/signup">
              <button className="bg-blue-800 text-white px-6 py-2 rounded">
                Signup
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;