import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes/router";
import { App } from "antd";
import { AuthProvider } from "./context/AuthProvider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <App>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </App>,
);
