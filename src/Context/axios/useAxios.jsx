import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
})
const useAxios = () => {
    const {user} = useContext(AuthContext);

    axiosInstance.interceptors.request.use(config =>{
        config.headers.authorization = `Bearer ${user.accessToken}`
    })
    return axiosInstance;
};

export default useAxios;