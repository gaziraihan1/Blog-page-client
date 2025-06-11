import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";


const ExtraSect1 = () => {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/blog").then((res) => setDatas(res.data));
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
    <div className="my-10 md:my-12 lg:my-18">
      <h2 className="text-lg lg:text-2xl font-semibold">Authors <span className="text-xs font-normal text-gray-300">Slide to see more</span></h2>
      <div className="max-w-sm mx-auto my-2">
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
          <div className="p-4 flex justify-center flex-col items-center border rounded border-gray-200">
            <p className="md:text-lg xl:text-xl font-medium text-gray-600 my-1">{blog.email}</p>
            <img
              src={blog.writer_photo}
              className="w-[50%] rounded-full object-center border-2 border-gray-200 p-1"
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
