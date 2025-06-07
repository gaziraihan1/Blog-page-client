import React, { useCallback } from 'react';
import useAxios from '../../Context/axios/useAxios';

const useUpdateApi = () => {
   const axiosInstance = useAxios();

    const detailsUpdateApi = useCallback(id => axiosInstance.get(`/blog/${id}`).then(res => res.data), [axiosInstance]) ;
    return {
        detailsUpdateApi
    }
};

export default useUpdateApi;