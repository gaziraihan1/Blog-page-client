import React from 'react';
import useAxios from '../../Context/axios/useAxios';

const useWishlistApi = () => {

    const axiosSecure = useAxios();
    
    const wishListDataApi = email => axiosSecure.get(`/wishlist?email=${email}`).then(res => res.data);
    const deleteWishlistItem = (id, email) =>
    axiosSecure
      .delete(`/wishlist/${id}?email=${email}`)
      .then((res) => res.data);

    

    return {
        wishListDataApi,
        deleteWishlistItem
    }

};

export default useWishlistApi;