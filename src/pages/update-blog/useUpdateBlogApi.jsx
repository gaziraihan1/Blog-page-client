import React from 'react';
import useAxios from '../../Context/axios/useAxios';

const useUpdateBlogApi = () => {
    const axiosInstance = useAxios();
    const updateApi = (id, updatedData) => {
        return axiosInstance.put(`/blog/${id}`, updatedData)
        .then(res => res.data)
    }
    return {
        updateApi
    }
};

export default useUpdateBlogApi;