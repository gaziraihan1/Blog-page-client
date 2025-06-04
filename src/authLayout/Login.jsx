import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";



const Login = () => {
    const [showPass, setShowPass] = useState(false);
      const { googleLogin, setUser, signinUser } = useContext(AuthContext);
      const navigate = useNavigate();
      const location = useLocation();
    
    
       useEffect(() => {
          document.title = "Freelance task MP | Login"
        })
    
      const handleSignIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
    
        signinUser(email, password)
          .then(() => {
            navigate(location.state ? location.state : "/");
          })
          .catch((error) => {
            console.log(error)
          });
      };
    
      const loginWithGoogle = () => {
        googleLogin().then((result) => {
          setUser(result.user);
          setTimeout(() => {
            navigate(location.state ? location.state : "/");
          }, 1000);
        });
      };
  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <div className="bg-base-200 border-base-300 rounded-box border py-6 px-8">
      <h1 className="py-2 text-gray-300 text-2xl font-medium">
        Login
      </h1>
      <form onSubmit={handleSignIn} className="fieldset">
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
            />
            <div className="relative mt-2">
              <label className="label">Password</label>
              <input
                name="password"
                type={showPass ? "text" : "password"}
                className="input mt-1"
                placeholder="Password"
              />
              <div
                className="absolute top-8.5 right-6 z-40"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff
                 size={18} /> : <Eye size={18} />}
              </div>
            </div>

            <button type="submit" className="btn ring-1 ring-gray-300 bg-blue-800 text-gray-200 mt-4">
              Login
            </button>
          </form>
          <p className=" text-sm md:text-base mt-2 text-gray-300">
            If you don't have an account?{" "}
            <Link
              className="text-blue-600 hover:text-blue-500"
              to="/auth/register"
            >
              Register
            </Link>
          </p>
          <h2 className="text-center text-sm md:text-base mt-2 text-gray-300">Or</h2>
          <button
            onClick={loginWithGoogle}
            className="flex items-center py-2 px-3 justify-center border rounded-4xl gap-2 font-medium cursor-pointer w-full mt-2 text-gray-300"
          >
            <FcGoogle size={22} />
            Login with Google
          </button>
      </div>
    </div>
  );
};

export default Login;
