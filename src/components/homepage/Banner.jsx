import React from 'react';
import { motion } from "motion/react"

const Banner = () => {
    return (
        <div className='flex flex-col md:flex-row justify-center gap-4 md:gap-2 lg:gap-8 xl:gap-14 2xl:gap-18 items-center rounded my-8 md:my-12 px-4 md:px-6 xl:px-8 py-6 md:py-4 xl:py-12 bg-gradient-to-r from-blue-100 via-blue-100 to-blue-300 text-white'>
            <motion.div initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.5 }} className='max-w-xl'>
                <h1  className='text-xl md:text-2xl xl:text-4xl text-gray-700 font-bold '>Welcome to <motion.span animate={
                                {
                                    color: ['#ff5733', '#009000'],
                                    transition: { duration: 2, repeat: Infinity }
                                }} className='' >Ultra Blog</motion.span> page</h1>
                <p  className='my-2 md:my-4 lg:my-6 xl:my-8 text-sm md:text-base text-gray-500 font-mono font-semibold'>
                    <span className='font-bold text-gray-500'>Ultra Blog</span> is super tool for find important news and easily where you can share your thoughts and guide too.
                    We make this blog page following the decentralized path, we are requesting you to share your experience with us and with the people who live all over the world. <br />
                    We are here to show your experience globally
                </p>
                <h3 className='my-4 md:my-0 px-6 md:px-8 py-2 md:py-3 lg:py-4 text-gray-200 rounded bg-blue-700 inline-block'>
                    Explore the blogs
                </h3>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.5 }}>
                <img className='max-w-md min-w-xs h-62 md:h-64 lg:h-74 xl:h-80 2xl:h-88' src="/blogs-banner.png" alt="" />
            </motion.div>
        </div>
    );
};

export default Banner;