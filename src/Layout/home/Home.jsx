import React from 'react';
import Banner from '../../components/homepage/Banner';
import RecentBlog from '../../components/homepage/RecentBlog';
import NewsLetter from '../../components/homepage/NewsLetter';

const Home = () => {
    return (
        <div>
            <Banner />
            <RecentBlog />
            <NewsLetter />
        </div>
    );
};

export default Home;