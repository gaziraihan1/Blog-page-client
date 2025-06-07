import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import WishlistData from '../../components/wishlist-list/WishlistData';
import useWishlistApi from './useWishlistApi';

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