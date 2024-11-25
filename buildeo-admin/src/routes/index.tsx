import ProviderPage from '@/pages/Admin/Provider';
import DetailProvider from '@/pages/Admin/Provider/detail';
import DetailOffer from '@/pages/Admin/Provider/detail-offer';
import DetailService from '@/pages/Admin/Provider/detail-service';
import ReviewsPage from '@/pages/Admin/Reviews';
import DetailReviews from '@/pages/Admin/Reviews/detail';
import TransactionPage from '@/pages/Admin/Transaction';
import DetailTransaction from '@/pages/Admin/Transaction/detail';
import FormPage from '@/pages/form';
import NotFound from '@/pages/not-found';
import path from 'path';
import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';

const DashboardLayout = lazy(
  () => import('@/components/layout/dashboard-layout')
);
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const DashboardPage = lazy(() => import('@/pages/dashboard'));
const StudentPage = lazy(() => import('@/pages/students'));
const StudentDetailPage = lazy(
  () => import('@/pages/students/StudentDetailPage')
);

// ----------------------------------------------------------------------

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: <DashboardPage />,
          index: true
        },
        {
          path: 'student',
          element: <StudentPage />
        },
        {
          path: 'student/details',
          element: <StudentDetailPage />
        },
        {
          path: 'form',
          element: <FormPage />
        },
        {
          path:'provider-manage',
          element:<ProviderPage/>
        },
        {
          path:'provider-manage/details',
          element:<DetailProvider/>
        },
        {
          path:'sa-servive/detail',
          element:<DetailService/>
        },
        {
          path:'sa-offer/detail',
          element:<DetailOffer/>
        },
        {
          path:'admin-manage-transaction',
          element:<TransactionPage/>
        },
        {
          path:'sa-transaction/detail',
          element:<DetailTransaction/>
        },
        {
          path:'admin-manage-reviews',
          element: <ReviewsPage/>
        },
        {
          path:'/sa-reviews/details',
          element:<DetailReviews/>
        }
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/login',
      element: <SignInPage />,
      index: true
    },
    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
