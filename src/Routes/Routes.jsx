import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/mainLayout/MainLayout";
import Home from "../Layout/home/Home";
import AuthLayout from "../authLayout/AuthLayout";
import Register from "../authLayout/Register";
import Login from "../authLayout/Login";
import Error from "../components/Error/Error";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home
            }
        ]
    },
    {
        path: '/auth',
        Component: AuthLayout,
        children: [
            {
                path: '/auth/register',
                Component: Register
            },
            {
                path: '/auth/login',
                Component: Login
            }
        ]
    },
    {
        path: '*',
        Component: Error
    }
])