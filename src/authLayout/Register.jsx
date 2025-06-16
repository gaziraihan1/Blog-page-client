import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthProvider";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();



  const { createUser, googleLogin, setUser, updateUser, logOut, setLoading } =
    useContext(AuthContext);
  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { name, photoUrl, email, password } = Object.fromEntries(
      formData.entries()
    );

    const capLetter = /[A-Z]/;
    const smLetter = /[a-z]/;
    const specialChar = /[^a-zA-Z0-9]/;

    if (password.length < 6) {
      setError("Password must be 6 or more character");
      return;
    }
    if (!capLetter.test(password)) {
      setError("Password must have Capital letter");
      return;
    }
    if (!smLetter.test(password)) {
      setError("Password must have small letter");
      return;
    }
    if (!specialChar.test(password)) {
      setError("Password must have special character");
      return;
    }
    
    setError("");
    setEmailError("")

    setLoading(true); // Start loading

createUser(email, password)
  .then(() => updateUser({ displayName: name, photoURL: photoUrl }))
  .then(() => logOut())
  .then(() => {
    setLoading(false);
    navigate("/auth/login");
  })
  .catch((error) => {
    console.error("Registration Error:", error);
    setLoading(false); 
    if (error.code === "auth/email-already-in-use") {
      setEmailError("Email already used, try a different Email address.");
      navigate("/auth/register");
    } else {
      setEmailError("Something went wrong. Try again.");
    }
  });


    // createUser();
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
      <div className="card bg-base-200 border-base-300 rounded-box border py-6 px-8">
        <h2 className="py-2 text-gray-700 text-2xl font-medium">Signup</h2>
        <form onSubmit={handleSignUp} className="fieldset">
          <label className="label">Name</label>
          <input
            name="name"
            type="text"
            className="input"
            placeholder="Name"
            required
          />
          <div>

          <label className="label">Email</label>
          <input
            name="email"
            type="email"
            className="input"
            placeholder="Email"
            required
          />
          {emailError && <p className="text-red-800 text-sm mt-1">{emailError}</p>}
          </div>
          <label className="label">PhotoURL</label>
          <input
            name="photoUrl"
            type="text"
            className="input"
            placeholder="Photo"
            required
          />
          <div className="relative">
            <label className="label">Password</label>
            <input
              name="password"
              type={showPass ? "text" : "password"}
              className="input mt-1"
              placeholder="Password"
            />
            {error && <p className="text-red-800 text-sm mt-1">{error}</p>}
            <div
              className="absolute top-8.5 right-6 z-40"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>
          <button
            type="submit"
            className="btn ring-1 ring-gray-300 bg-blue-800 text-gray-200 mt-4"
          >
            Signup
          </button>
        </form>
        <p className="text-sm md:text-base mt-2 text-gray-500">
          You have an account already?{" "}
          <Link className="text-blue-600 hover:text-blue-500" to="/auth/login">
            Login
          </Link>
        </p>
        <h2 className=" text-sm md:text-base mt-2 text-center text-gray-500">
          Or
        </h2>
        <button
          onClick={loginWithGoogle}
          className="flex items-center py-2 px-3 justify-center border rounded-4xl gap-2 font-medium cursor-pointer w-full mt-2 text-gray-500"
        >
          <FcGoogle size={22} />
          Signup with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
