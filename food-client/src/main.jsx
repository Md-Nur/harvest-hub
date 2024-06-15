import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import UserAuthProvider from "./context/UserAuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserAuthProvider>
        <RouterProvider router={router} />
      </UserAuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
