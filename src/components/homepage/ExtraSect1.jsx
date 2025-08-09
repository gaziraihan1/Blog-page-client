import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";


const ExtraSect1 = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    axios.get("https://assignment-11-server-beige.vercel.app/blog").then((res) => setDatas(res.data));
  }, []);

  const uniqueWriters = [];

  for (const data of datas) {
    const isAlreadyAdded = uniqueWriters.find(
      (writer) => writer.email === data.email
    );

    if (!isAlreadyAdded) {
      uniqueWriters.push({
        email: data.email,
        writer_photo: data.writer_photo,
      });
    }
  }

  return (
    <div className="my-10 md:my-12 lg:my-16 2xl:my-20">
      <div className="max-w-sm mx-auto my-2 bg-gradient-to-l to-cyan-100 from-blue-100 dark:bg-gradient-to-tr dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 rounded">
        <Swiper
      spaceBetween={30}
      slidesPerView={1}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
    >
      {uniqueWriters.map((blog, index) => (
        <SwiperSlide key={index}>
          <div className="p-4 flex justify-center flex-col items-center border rounded border-gray-200 dark:border-gray-500">
            <p className="md:text-lg xl:text-xl font-medium text-base-content my-1">{blog.email}</p>
            <img
              src={blog.writer_photo}
              className="w-[50%] rounded-full object-center border-2 border-gray-200 dark:border-gray-600 p-1"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
      </div>
    </div>
  );
};

export default ExtraSect1;
