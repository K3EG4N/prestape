import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "@/pages/login/LoginPage";
import { RegisterPage } from "@/pages/register/RegisterPage";
import { Hero } from "@/pages/Hero";
import { UsersPage } from "@/pages/users/UsersPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { ADMIN_ROLE, SUPERVISOR_ROLE } from "@/constants/roles";
import type { IRouteHandle } from "@/interfaces/IRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Hero />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "users",
        element: <UsersPage />,
        handle: {
          breadcrumb: "Usuarios",
          roles: [ADMIN_ROLE, SUPERVISOR_ROLE],
        } satisfies IRouteHandle,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
]);
