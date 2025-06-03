import React from 'react';
import Navbar from '../../components/Header/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../components/Footer/Footer';

const MainLayout = () => {
    return (
        <>
        <Navbar />
        <Outlet />
        <Footer />
        </>
    );
};

export default MainLayout;