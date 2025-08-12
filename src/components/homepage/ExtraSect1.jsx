import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const ExtraSect1 = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    axios
      .get("https://assignment-11-server-beige.vercel.app/blog")
      .then((res) => setDatas(res.data));
  }, []);

  const uniqueWriters = [];
  for (const data of datas) {
    if (!uniqueWriters.find((writer) => writer.email === data.email)) {
      uniqueWriters.push({
        email: data.email,
        writer_photo: data.writer_photo,
      });
    }
  }

  return (
    <section className="my-16 2xl:my-28 px-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-base-content">
          ✨ Featured Writers
        </h2>
        <p className="mt-2 text-base text-base-content/70">
          Meet the amazing authors behind our top blogs.
        </p>
      </div>

      <div className="max-w-lg mx-auto">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Autoplay]}
        >
          {uniqueWriters.map((blog, index) => (
            <SwiperSlide key={index}>
              <div className="p-6 flex flex-col items-center bg-base-100 border border-base-300 rounded-2xl shadow-md transition-transform hover:scale-[1.02]">
                <img
                  src={blog.writer_photo}
                  alt="Writer"
                  className="w-28 h-28 rounded-full object-cover border-4 border-primary shadow-sm"
                />
                <p className="mt-4 font-semibold text-base-content">
                  {blog.email}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ExtraSect1;
