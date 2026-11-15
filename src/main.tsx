import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes/router";
import { App } from "antd";
import { AuthProvider } from "./context/AuthProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </App>
  </ThemeProvider>,
);
