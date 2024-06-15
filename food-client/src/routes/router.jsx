import ErrorPage from "../ErrorPage";
import Root from "../Root";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import AddFood from "../pages/AddFood";
import PrivateRoutes from "./PrivateRoutes";
import Login from "../pages/Login";
import AvailableFoods from "../pages/AvailableFoods";
import ManageMyFoods from "../pages/ManageMyFoods";
import MyFoodRequest from "../pages/MyFoodRequest";
import Register from "../pages/Register";
import FoodDetails from "../pages/FoodDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "add-food",
        element: (
          <PrivateRoutes>
            <AddFood />
          </PrivateRoutes>
        ),
      },
      {
        path: "/available-foods",
        element: <AvailableFoods />,
      },
      {
        path: "/manage-my-foods",
        element: (
          <PrivateRoutes>
            <ManageMyFoods />
          </PrivateRoutes>
        ),
      },
      {
        path: "/my-food-request",
        element: (
          <PrivateRoutes>
            <MyFoodRequest />
          </PrivateRoutes>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/food/:id",
        element: (
          <PrivateRoutes>
            <FoodDetails />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default router;
