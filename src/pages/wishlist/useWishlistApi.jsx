import React from 'react';
import useAxios from '../../Context/axios/useAxios';

const useWishlistApi = () => {

    const axiosSecure = useAxios();
    
    const wishListDataApi = email => axiosSecure.get(`/wishlist?email=${email}`).then(res => res.data);

    return {
        wishListDataApi
    }

};

export default useWishlistApi;