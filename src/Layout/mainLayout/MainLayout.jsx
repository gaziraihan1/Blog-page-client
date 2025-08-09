import React, { useEffect } from 'react';
import Navbar from '../../components/Header/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../components/Footer/Footer';

const MainLayout = () => {
    useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
    return (
        <>
       <>
        <header className='px-2 lg:px-0 sticky top-0 z-50 bg-base-300'>
            <Navbar />
        </header>
        <main className='lg:w-11/12 mx-auto 2xl:w-10/12 p-4 lg:p-0 min-h-[90vh] max-w-7xl'>
            <Outlet />
        </main>
        <footer className='p-4 md:p-2 lg:py-4 lg:px-0 bg-slate-800 text-slate-300'>
            <Footer />
        </footer>
        </>
        </>
    );
};

export default MainLayout;