import React from 'react';
import Skeleton from 'react-loading-skeleton';

const WishlistData = ({ wishlist, loading }) => {
    if (loading) {
        return (
            <div className="flex justify-center items-center mt-6">
                <Skeleton width={300} count={8} />
            </div>
        );
    }

    if (wishlist.length === 0) {
        return (
            <h2 className="text-lg text-red-600 font-bold text-center">
                No item's found
            </h2>
        );
    }

    return (
        <div>
            {wishlist.map(item => (
                <div key={item._id} className="p-4 border mb-2">
                    <h2 className="font-bold">{item.title}</h2>
                    <p>{item.category}</p>
                </div>
            ))}
        </div>
    );
};

export default WishlistData;
