import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const AssetsPage = lazy(() => import('src/pages/assetes'));
export const CandidateProfilePage = lazy(() => import('src/pages/candidateProfile'));

export const ClientCalendarPage = lazy(() => import('src/pages/clientcalendar'));

export const AtsPage = lazy(() => import('src/pages/ats'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const BillingPage = lazy(() => import('src/pages/billing'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        {
          path: 'ats',
          element: <AtsPage />,
        },
        { path: 'ats/candidateprofile', element: <CandidateProfilePage /> },

        { path: 'billing', element: <BillingPage /> },
        { path: 'assets', element: <ClientCalendarPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
