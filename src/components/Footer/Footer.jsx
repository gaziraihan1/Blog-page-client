import React from "react";
import { Link, NavLink } from "react-router";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <div className="py-8 lg:py-14 flex flex-col md:flex-row justify-between text-center md:text-left p-4 lg:w-11/12 2xl:w-10/12 mx-auto gap-6">
      <div>
        <h2 className="text-xl lg:text-2xl 2xl:text-3xl font-bold">
          Task<span className="text-green-700">MP</span>
        </h2>
        <ul className="space-y-2 md:space-y-3 mt-2 md:mt-4">
          <li>
            <a className="hover:underline hover:text-blue-600 transition" href="">Terms & condition</a>
          </li>
          <li>
            <a className="hover:underline hover:text-blue-600 transition" href="">Privacy policy</a>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-lg md:text-xl font-medium">Direct Links</h2>
        <ul className="space-y-1 md:space-y-3 mt-2 md:mt-4">
          <li>
            <Link  className="hover:underline hover:text-blue-600 transition" to={"/"}>Home</Link>
          </li>
          <li>
            <Link className="hover:underline hover:text-blue-600 transition" to={"/add-task"}>Add Task</Link>
          </li>
          <li>
            <Link className="hover:underline hover:text-blue-600 transition" to={"/browse-task"}>Browse Tasks</Link>
          </li>
          <li>
            <Link className="hover:underline hover:text-blue-600 transition" to={"/my-posted-task"}>My Posted Tasks</Link>
          </li>
        </ul>
      </div>
      <div>
        <h2 className="text-lg md:text-xl font-medium">Social Links</h2>
        <ul className="flex gap-2 md:gap-4 mt-2 md:mt-4 justify-center ">
          <li>
            <SocialIcon style={{height: 36, width: 36}} url="https://www.facebook.com/mohammad.raihan.gazi" />
          </li>
          <li>
            <SocialIcon style={{height: 36, width: 36}} url="https://x.com/raihangazy90" />
          </li>
          <li>
            <SocialIcon style={{height: 36, width: 36}} url="https://github.com/gaziraihan1" />
          </li>
          <li>
            <SocialIcon style={{height: 36, width: 36}} url="https://www.linkedin.com/in/mohammad-raihan-gazi"/>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
