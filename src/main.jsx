import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./routes/Routes.jsx";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import FirebaseProvider from "./providers/FirebaseProvider.jsx";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <FirebaseProvider>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition:Zoom
          />
        </FirebaseProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);
