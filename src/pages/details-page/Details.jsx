import React, { useEffect, useState } from 'react';
import {  useParams } from 'react-router';
import useDetailsApi from './useDetailsApi';

const Details = () => {
    const { detailsDataApi } = useDetailsApi();
  const { id: _id } = useParams(); 
  const [details, setDetails] = useState();


   useEffect(() => {
  if (_id) {
    detailsDataApi(_id)
      .then(res => {
        setDetails(res);
      })
      .catch(err => {
        console.error('Error fetching details:', err);
      });
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [_id]); 

    return (
        <div>
            <h2>
                {details?.title}
            </h2>
        </div>
    );
};

export default Details;