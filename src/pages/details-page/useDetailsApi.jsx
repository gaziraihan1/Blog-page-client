import React, { useCallback } from 'react';
import useAxios from '../../Context/axios/useAxios';

const useDetailsApi = () => {
    const axiosInstance = useAxios();

    const detailsDataApi = useCallback(id => axiosInstance.get(`/blog/${id}`).then(res => res.data), [axiosInstance]) ;
    return {
        detailsDataApi
    }
};

export default useDetailsApi;