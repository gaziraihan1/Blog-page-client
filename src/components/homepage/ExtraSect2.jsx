import React from "react";
import { motion } from "motion/react";

const ExtraSect2 = () => {
  return (
    <section className="my-12 md:my-16 lg:my-20">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-2xl md:text-3xl font-bold text-center text-base-content"
      >
        🌍 Our Vision
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-6 flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 bg-base-200 dark:bg-base-300 p-6 rounded-2xl shadow-lg"
      >
        <p className="text-center lg:text-left text-base md:text-lg text-base-content max-w-2xl leading-relaxed">
          Our goal is to build a{" "}
          <span className="font-semibold text-primary">community-driven blog</span>{" "}
          where everyone can express their thoughts, share their experiences, and
          inspire others. Whether you're writing about{" "}
          <span className="font-semibold">tech</span>,{" "}
          <span className="font-semibold">lifestyle</span>,{" "}
          <span className="font-semibold">personal growth</span>, or anything you’re
          passionate about — your voice matters here.
        </p>

        <div className="bg-base-200 rounded-xl shadow-md p-5 w-full max-w-md">
          <h3 className="text-lg md:text-xl font-semibold mb-4 text-base-content">
            👥 What You Can Do
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-xl">✍️</span>
              <span className="text-sm md:text-base text-base-content">
                <strong>Write Blogs:</strong> Logged-in users can create and publish
                their own blog posts anytime.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-xl">🛠️</span>
              <span className="text-sm md:text-base text-base-content">
                <strong>Edit Your Posts:</strong> You have full control to update or
                modify your blog posts whenever you like.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-xl">📖</span>
              <span className="text-sm md:text-base text-base-content">
                <strong>Read & Explore:</strong> Anyone can browse and enjoy the
                blogs shared by our amazing community.
              </span>
            </li>
          </ul>
        </div>
      </motion.div>
    </section>
  );
};

export default ExtraSect2;
