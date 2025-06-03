import React from 'react';
import Navbar from '../../components/Header/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../components/Footer/Footer';

const MainLayout = () => {
    return (
        <>
       <>
        <header className='p-4 md:p-2 lg:py-4 lg:px-0 bg-slate-200 '>
            <Navbar />
        </header>
        <main className='lg:w-11/12 mx-auto 2xl:w-10/12 p-4 md:p-2 lg:p-0 min-h-[90vh]'>
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