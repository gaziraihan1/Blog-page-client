import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/mainLayout/MainLayout";
import Home from "../Layout/home/Home";
import AuthLayout from "../authLayout/AuthLayout";
import Register from "../authLayout/Register";
import Login from "../authLayout/Login";
import Error from "../components/Error/Error";
import PrivateRoute from "../provider/PrivateRoute";
import AddBlog from "../pages/add-blog/AddBlog";
import AllBlogs from "../pages/all-blogs/AllBlogs";
import FeaturedBlogs from "../pages/featured-blog/FeaturedBlogs";
import Wishlist from "../pages/wishlist/Wishlist";
import Details from "../pages/details-page/Details";
import UpdateBlog from "../pages/update-blog/UpdateBlog";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
        loader: () =>
          fetch(
            "https://assignment-11-server-beige.vercel.app/recent-blog"
          ),
      },
      {
        path: "/add-blog",
        element: (
          <PrivateRoute>
            <AddBlog />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-blogs",
        Component: AllBlogs,
      },
      {
        path: "/featured-blogs",
        Component: FeaturedBlogs,
      },
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            <Wishlist />
          </PrivateRoute>
        ),
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <Details />
          </PrivateRoute>
        ),
      },
      {
        path: "blog/update/:id",
        element: (
          <PrivateRoute>
            <UpdateBlog />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/register",
        Component: Register,
      },
      {
        path: "/auth/login",
        Component: Login,
      },
    ],
  },
  {
    path: "*",
    Component: Error,
  },
]);
