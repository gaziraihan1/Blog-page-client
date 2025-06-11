import React from "react";

const ExtraSect2 = () => {
  return (
    <div className="my-10 md:my-12 lg:my-18">
      <h2 className="text-lg lg:text-2xl font-semibold">Our vision</h2>
      <div className="bg-gray-100 my-2 p-4 rounded flex flex-col lg:flex-row justify-center lg:items-start items-center gap-4">
        <p className="text-center text-gray-600 max-w-2xl py-2">
          Our goal is to build a community-driven blog where everyone can
          express their thoughts, share their experiences, and inspire others.
          Whether you're writing about tech, lifestyle, personal growth, or any
          topic you're passionate about, your voice matters here.
        </p>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-700">👥 What You Can Do</h2>
          <p className="text-sm md:text-base text-gray-500">
            ✍️ Write Blogs: Logged-in users can create and publish their own
            blog posts anytime.
          </p>
          <p className="text-sm md:text-base text-gray-500">
            🛠️ Edit Your Posts: You have full control over your content – you
            can go back and edit or update your blog posts whenever you like.
          </p>
          <p className="text-sm md:text-base text-gray-500">
            📖 Read and Explore: Everyone can browse and read blogs shared by
            others in the community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExtraSect2;
