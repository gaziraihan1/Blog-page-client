import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import WishlistData from "../../components/wishlist-list/WishlistData";
import useWishlistApi from "./useWishlistApi";

const Wishlist = () => {
  const { wishListDataApi } = useWishlistApi();
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      wishListDataApi(user.email)
        .then((data) => {
          setWishlist(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load wishlist:", err);
          setLoading(false);
        });
    }
  }, [user?.email]);
  wishlist;

  return (
    <div>
      <WishlistData wishlist={wishlist} loading={loading} />
    </div>
  );
};

export default Wishlist;
