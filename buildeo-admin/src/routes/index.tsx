import BuyerPage from '@/pages/Admin/Buyer';
import DetailBuyer from '@/pages/Admin/Buyer/detail';
import DetailOfferBuyer from '@/pages/Admin/Buyer/Detail Data/offer-detail';
import DetailTransactionBuyer from '@/pages/Admin/Buyer/Detail Data/transaction-detail';
import OffersPage from '@/pages/Admin/Offers';
import DetailOffers from '@/pages/Admin/Offers/detail-offers';
import ProviderPage from '@/pages/Admin/Provider';
import DetailProvider from '@/pages/Admin/Provider/detail';
import DetailOffer from '@/pages/Admin/Provider/detail-offer';
import DetailService from '@/pages/Admin/Provider/detail-service';
import ReviewsPage from '@/pages/Admin/Reviews';
import DetailReviews from '@/pages/Admin/Reviews/detail';
import BasketPage from '@/pages/Admin/Shoping Basket';
import DetailBasketShop from '@/pages/Admin/Shoping Basket/Detail';
import TransactionPage from '@/pages/Admin/Transaction';
import DetailTransaction from '@/pages/Admin/Transaction/detail';
import FormPage from '@/pages/form';
import NotFound from '@/pages/not-found';
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
        },
        {
          path:'admin-manage-buyer',
          element:<BuyerPage/>
        },
        {
          path:'/sa-buyer/details',
          element:<DetailBuyer/>
        },
        {
          path:'/sa-buyer/offer-details/',
          element:<DetailOfferBuyer/>
        },
        {
          path:'/sa-buyer/transaction-detail/',
          element:<DetailTransactionBuyer/>
        },
        {
          path:'admin-manage-offers',
          element:<OffersPage/>
        },
        {
          path:'/sa-offers/detail-offers/',
          element:<DetailOffers/>
        },
        {
          path:'admin-manage-shopbasket',
          element:<BasketPage/>
        },
        {
          path:'/sa-basket/details',
          element:<DetailBasketShop/>
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
