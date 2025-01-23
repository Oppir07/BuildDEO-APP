import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/login";
import RegisterPage from "./pages/Auth/register";
import MenuPage from "./pages/buyer/Menu";
import DetailMenuPage from "./pages/buyer/Menu/detail";
import PaymentPage from "./pages/buyer/payment/payment";
import OrdersPage from "./pages/buyer/order/orders";
import ResultPage from "./pages/Profile/Review/result";
import ReviewPage from "./pages/Profile/Review/review";
import EditPage from "./pages/Profile/Review/edit";
import DetailProduct from "./pages/Craftman/Product/detail";
import CreateProductPage from "./pages/Craftman/Product/create";
import ProductNewPage from "./pages/Craftman/Product";
import EditProductPage from "./pages/Craftman/Product/edit";
import RatingPage from "./pages/Craftman/Home/detailRating";
import DetailBuyerPage from "./pages/Craftman/Home/detailBuyer";
import ConfirmPayPage from "./pages/buyer/payment/confirmPay";
import DocumentPage from "./pages/Favorable/document";
import OfferBuyerEditPage from "./pages/buyer/Favorable/edit";
import OfferBuyerDetailPage from "./pages/buyer/Favorable/detail";
import OrderOfferPage from "./pages/buyer/Favorable/order";
import DetailPortfolioPage from "./pages/Craftman/Protfolio/detail";
import CreatePortfolio from "./pages/Craftman/Protfolio/create";
import EditPortfolio from "./pages/Craftman/Protfolio/edit";
import HomeCompanyPage from "./pages/Craftman/Home/index";
import OffersPage from "./pages/buyer/offers/index";
import CartPage from "./pages/buyer/Menu/cart";
import FormNegotiationPage from "./pages/buyer/payment/form-negotiable";
import OfferFormPage from "./pages/buyer/Favorable";
import ProfilePage from "./pages/buyer/Profile";
import ChatPage from "./pages/buyer/chat";
import HomeBuyer from "./pages/Home";
import HomeSeller from "./pages/Home/seller";
import ServicePage from "./pages/seller/service/my_service";
import AddServicePage from "./pages/seller/service/add-new";
import DetailService from "./pages/seller/service/detail";
import MyOrderPage from "./pages/seller/order/order-my-service";



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home/buyer" element={<HomeBuyer />} />
        <Route path="/home/seller" element={<HomeSeller />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/services/:id" element={<DetailMenuPage />} />

        {/* buyer */}
        <Route path="/checkout" element={<PaymentPage />} />
        <Route path="/payment-confirm" element={<ConfirmPayPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/review" element={<ReviewPage />} />
        <Route path="/orders/review/result" element={<ResultPage />} />
        <Route path="/orders/review/edit" element={<EditPage />} />

        {/* cart  */}
        <Route path="/cart" element={<CartPage/>} />

        {/* Negotiation  */}
        <Route path="/negotiable" element={<FormNegotiationPage/>} />

        {/* offres  */}
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/offer/form" element={<OfferFormPage/>} />

        {/* chat  */}
        <Route path="/chat" element={<ChatPage/>} />


        {/* seller  */}
        <Route path="/my-service" element={<ServicePage/>} />
        <Route path="/add-service" element={<AddServicePage/>} />
        <Route path="/detail-service" element={<DetailService/>} />
        <Route path="/my-order/service" element={<MyOrderPage/>} />


        {/* favorable */}
        {/* unauthenticated user */}
        {/* <Route path="/offers" element={<FavorablePage/>} /> */}
        <Route path="/favorable/document" element={<DocumentPage/>} />
        <Route path="/favorable/document/profile/" element={<OrderOfferPage/>} />
        
        
        <Route path="/favorable/document-buyer/edit/" element={<OfferBuyerEditPage/>} />
        <Route path="/favorable/document-buyer/detail/" element={<OfferBuyerDetailPage/>} />


        {/* craft */}
        <Route path="/home/craftman" element={<HomeCompanyPage />} />
        <Route path="/home/craftman/product-detail/:id" element={<DetailProduct />} />
        <Route path="/home/craftman/create-product" element={<CreateProductPage />} />
        <Route path="/home/craftman/show-product/:id" element={<ProductNewPage />} />
        <Route path="/home/craftman/edit-product/:id" element={<EditProductPage />} />
        <Route path="/home/craftman/rating-product" element={<RatingPage />} />
        <Route path="/home/craftman/buyer/confirm-product" element={<DetailBuyerPage />} />
        <Route path="/home/craftman/portfolio/detail" element={<DetailPortfolioPage />} />
        <Route path="/home/craftman/portfolio/create" element={<CreatePortfolio/>} />
        <Route path="/home/craftman/portfolio/edit" element={<EditPortfolio/>} />
      </Routes>
    </Router>
  )
}