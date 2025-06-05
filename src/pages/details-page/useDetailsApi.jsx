import React from 'react';
import useAxios from '../../Context/axios/useAxios';

const useDetailsApi = () => {
    const axiosInstance = useAxios();

    const detailsDataApi = id => axiosInstance.get(`/blog/${id}`).then(res => res.data);
    return {
        detailsDataApi
    }
};

export default useDetailsApi;