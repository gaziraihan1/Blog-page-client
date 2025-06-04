import React from 'react';
import useAxios from './useAxios';

const useWishlistApi = () => {

    const axiosSecure = useAxios();

    const wishListDataApi = email => {
        return axiosSecure.get(`/wishlist?email=${email}`).then(res => res.data)
    }
    return {
        wishListDataApi
    }
};

export default useWishlistApi;