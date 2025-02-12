import BuyerPage from '@/pages/Admin/Buyer';
import DetailBuyer from '@/pages/Admin/Buyer/detail';
import DetailOfferBuyer from '@/pages/Admin/Buyer/Detail Data/offer-detail';
import DetailTransactionBuyer from '@/pages/Admin/Buyer/Detail Data/transaction-detail';
import DividendPage from '@/pages/Admin/dividend';
import DetailDividendPage from '@/pages/Admin/dividend/detail';
import FormDividendPage from '@/pages/Admin/dividend/form_dividend';
import GuestOffersPage from '@/pages/Admin/guest-offers';
import DetailGuestOffers from '@/pages/Admin/guest-offers/detail';
import OffersPage from '@/pages/Admin/Offers';
import DetailOffers from '@/pages/Admin/Offers/detail-offers';
import OrdersDonePage from '@/pages/Admin/order/order-done';
import DetailOrderDone from '@/pages/Admin/order/order-done/detail_order_done';
import OrdersPendingPage from '@/pages/Admin/order/order-pending';
import DetailOrderPending from '@/pages/Admin/order/order-pending/detail_order_pending';
import ProviderPage from '@/pages/Admin/Provider';
import DetailProvider from '@/pages/Admin/Provider/detail';
import DetailOffer from '@/pages/Admin/Provider/detail-offer';
import DetailService from '@/pages/Admin/Provider/detail-service';
import Quotations from '@/pages/Admin/Quotations';
import DetailQuotations from '@/pages/Admin/Quotations/Detail';
import Request from '@/pages/Admin/Request';
import DetailRequest from '@/pages/Admin/Request/Detail';
import ReviewsPage from '@/pages/Admin/Reviews';
import DetailReviews from '@/pages/Admin/Reviews/detail';
import ManageServicePage from '@/pages/Admin/service/manage-service';
import AddCategory from '@/pages/Admin/service/manage-service/add_category';
import RequestServicePage from '@/pages/Admin/service/request-service';
import DetailRequestService from '@/pages/Admin/service/request-service/detail';
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
        },
        {
          path:'/admin-manage-quotation',
          element:<Quotations/>
        },
        {
          path:'/sa-quotations/detail',
          element:<DetailQuotations/>
        },
        {
          path:'/admin-manage-request',
          element:<Request/>
        },
        {
          path:'/sa-request/detail',
          element:<DetailRequest/>
        },
        {
          path:'/admin-order-done',
          element:<OrdersDonePage/>
        },
        {
          path:'/admin-dividend',
          element:<DividendPage/>
        },
        {
          path:'/admin-dividend-detail',
          element:<DetailDividendPage/>
        },
        {
          path:'/admin-dividend-form',
          element:<FormDividendPage/>
        },
        {
          path:'/admin-detail-order-done',
          element:<DetailOrderDone/>
        },
        {
          path:'/admin-order-pending',
          element:<OrdersPendingPage/>
        },
        {
          path:'/admin-detail-order-pending',
          element:<DetailOrderPending/>
        },
        {
          path:'/admin-manage-category',
          element:<ManageServicePage/>
        },
        {
          path:'/admin-add-category',
          element:<AddCategory/>
        },
        {
          path:'/admin-request-service',
          element:<RequestServicePage/>
        },
        {
          path:'/admin-detail-request-service',
          element:<DetailRequestService/>
        },
        {
          path:'/admin-manage-guest-offers',
          element:<GuestOffersPage/>
        },
        {
          path:'/admin-manage-detail-guest-offers',
          element:<DetailGuestOffers/>
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
