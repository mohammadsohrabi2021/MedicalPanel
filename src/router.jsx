import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import PatientsPage from './pages/PatientsPage';
import ReportsPage from './pages/ReportsPage';
import ErrorPage from './pages/ErrorPage';
import MainLayout from './layout/MainLayout';
import IdentityLayout from './layout/IdentityLayout';

const router = createBrowserRouter([
  {
    path: "/",
    element: <IdentityLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "patients",
        element: <PatientsPage />,
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
    ],
  },
]);

export default router;
