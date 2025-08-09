import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router";

const Banner = () => {
  return (
    <section className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-12 lg:gap-16 xl:gap-20 my-12 md:my-16 lg:my-20">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
        className="max-w-xl text-center md:text-left"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-base-content leading-tight">
          Welcome to <span className="text-primary">Ultra Blog</span>
        </h1>

        <p className="mt-4 md:mt-6 text-base md:text-lg text-base-content/80 leading-relaxed">
          <span className="font-bold text-primary">Ultra Blog</span> is your
          go-to hub for discovering important news, sharing your thoughts, and
          guiding others. Built with a decentralized spirit, it’s a place for
          your voice to be heard globally. Join us and share your unique
          experiences with the world.
        </p>

        <button className="mt-6 inline-block btn btn-primary btn-lg shadow-lg hover:shadow-xl transition">
          <Link to="/blogs">🚀 Explore Blogs</Link>
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
      >
        <img
          className="max-w-sm lg:max-w-md rounded-xl shadow-xl hover:scale-105 transition-transform duration-500"
          src="/blogs-banner.png"
          alt="Blog Illustration"
        />
      </motion.div>
    </section>
  );
};

export default Banner;
