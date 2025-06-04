import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import useWishlistApi from '../../Context/axios/useWishlistApi';
import WishlistData from '../../components/wishlist-list/WishlistData';

const Wishlist = () => {
    const {wishListDataApi} = useWishlistApi()
    const {user} = useContext(AuthContext);
    return (
        <div>
            <WishlistData wishListDataApi={wishListDataApi(user.email)}/>
        </div>
    );
};

export default Wishlist;