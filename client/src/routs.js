import React from "react";
import {
  HOME_ROUTE,
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  ERROR_ROUTE, TABLE_ROUTE, OFFERING_ROUTE, PROFILE_ROUTE
} from "./utils/consts";
import AdminPage from "./pages/AdminPage";
import StatisticPage from "./pages/StatisticPage";
import AuthPage from "./pages/AuthPage";
import ErrorPage from "./pages/ErrorPage";
import TablePage from "./pages/TablePage";
import OfferingPage from "./pages/OfferingPage";
import ProfilePage from "./pages/ProfilePage";

export const privateRouts = [
  {
    path: ADMIN_ROUTE,
    component: <AdminPage />
  }
];

export const publicRouts = [
  {
    path: HOME_ROUTE,
    component: <StatisticPage />
  },
  {
    path: LOGIN_ROUTE,
    component: <AuthPage />
  },
  {
    path: TABLE_ROUTE,
    component: <TablePage />
  },
  {
    path: REGISTRATION_ROUTE,
    component: <AuthPage />
  },
  {
    path: OFFERING_ROUTE,
    component: <OfferingPage />
  },
  {
    path: PROFILE_ROUTE,
    component: <ProfilePage />
  },
  {
    path: ERROR_ROUTE,
    component: <ErrorPage />
  }
];
