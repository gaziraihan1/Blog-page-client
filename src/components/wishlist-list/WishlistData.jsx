import React, { useEffect, useState, useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Context/AuthProvider'; // or your auth source
import useWishlistApi from '../../pages/wishlist/useWishlistApi';

const WishlistData = ({ wishlist, loading }) => {
  const [wishlisted, setWishlisted] = useState([]);
  const { user } = useContext(AuthContext); 
  const { deleteWishlistItem } = useWishlistApi();

  useEffect(() => {
    setWishlisted(wishlist);
  }, [wishlist]);

  const handleDeleteBlog = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteWishlistItem(id, user.email)
          .then((data) => {
            if (data.success) {
              Swal.fire('Deleted!', 'Your item has been deleted.');
              const remaining = wishlisted.filter((item) => item._id !== id);
              setWishlisted(remaining);
            } else {
              Swal.fire('Error', data.message || 'Could not delete item', 'error');
            }
          })
          .catch((err) => {
            console.error(err);
            Swal.fire('Error', 'Something went wrong', 'error');
          });
      }
    });
  };

  if (wishlist.length === 0) {
    return (
      <h2 className="text-lg text-red-600 dark:text-red-800 font-bold text-center">
        No items found
      </h2>
    );
  }

  return (
    <div className="my-8">
      <h2 className="text-lg md:text-xl dark:text-gray-200 lg:text-2xl font-semibold my-4">
        All wishlisted content
      </h2>
      {loading ? (
        <div className="flex justify-center items-center mt-6">
          <Skeleton width={300} count={8} />
        </div>
      ) : (
        wishlisted.map((item) => (
          <div
            key={item._id}
            className="w-full p-4 border mb-2 flex gap-2 justify-between items-center dark:text-gray-300 dark:border-gray-600 rounded"
          >
            <h2 className="font-bold">{item.title}</h2>
            <p className="uppercase text-center">{item.category}</p>
            <button className="cursor-pointer" onClick={() => handleDeleteBlog(item._id)}>
              <IoMdCloseCircleOutline size={28} />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default WishlistData;
