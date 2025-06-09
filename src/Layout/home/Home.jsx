import React from 'react';
import Banner from '../../components/homepage/Banner';
import RecentBlog from '../../components/homepage/RecentBlog';
import NewsLetter from '../../components/homepage/NewsLetter';
import { useLoaderData } from 'react-router';
import ExtraSect1 from '../../components/homepage/ExtraSect1';
import ExtraSect2 from '../../components/homepage/ExtraSect2';

const Home = () => {
    const {data} = useLoaderData();
    return (
        <div>
            <Banner />
            <RecentBlog data={data}/>
            <ExtraSect1 />
            <ExtraSect2 />
            <NewsLetter />
        </div>
    );
};

export default Home;