import { createBrowserRouter, redirect } from "react-router-dom";
import { LoginPage } from "@/pages/login/LoginPage";
import { RegisterPage } from "@/pages/register/RegisterPage";
import { Hero } from "@/pages/Hero";
import { UsersPage } from "@/pages/users/UsersPage";
import { CatalogPage } from "@/pages/catalog/CatalogPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { ADMIN_ROLE, SUPERVISOR_ROLE } from "@/constants/roles";
import { CATALOG_PATH } from "@/constants/routes";
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
      {
        path: "catalogs",
        handle: { breadcrumb: "Catálogo" } satisfies IRouteHandle,
        children: [
          { index: true, loader: () => redirect(`${CATALOG_PATH}/equipment`) },
          {
            path: "equipment",
            element: <CatalogPage tab="equipment" />,
            handle: { breadcrumb: "Equipos" } satisfies IRouteHandle,
          },
          {
            path: "kits",
            element: <CatalogPage tab="kits" />,
            handle: { breadcrumb: "Kits" } satisfies IRouteHandle,
          },
          {
            path: "categories",
            element: <CatalogPage tab="categories" />,
            handle: { breadcrumb: "Categorías" } satisfies IRouteHandle,
          },
        ],
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
