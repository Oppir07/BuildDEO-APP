import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/login";
import RegisterPage from "./pages/Auth/register";
import Home from "./pages/Home";
import MenuPage from "./pages/buyer/Menu";
import DetailMenuPage from "./pages/buyer/Menu/detail";
import PaymentPage from "./pages/buyer/payment/payment";
import ProfilePage from "./pages/Profile";
import OrdersPage from "./pages/Profile/order/orders";
import ResultPage from "./pages/Profile/Review/result";
import ReviewPage from "./pages/Profile/Review/review";
import EditPage from "./pages/Profile/Review/edit";
import HomeCompanyPage from "./pages/Craftman/Home";
import DetailProduct from "./pages/Craftman/Product/detail";
import CreateProductPage from "./pages/Craftman/Product/create";
import ProductNewPage from "./pages/Craftman/Product";
import EditProductPage from "./pages/Craftman/Product/edit";
import RatingPage from "./pages/Craftman/Home/detailRating";
import DetailBuyerPage from "./pages/Craftman/Home/detailBuyer";
import ConfirmPayPage from "./pages/buyer/payment/confirmPay";
import FavorablePage from "./pages/Favorable";
import DocumentPage from "./pages/Favorable/document";
import OfferBuyerPage from "./pages/buyer/Favorable";
import OfferBuyerEditPage from "./pages/buyer/Favorable/edit";
import OfferBuyerDetailPage from "./pages/buyer/Favorable/detail";
import OrderOfferPage from "./pages/buyer/Favorable/order";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/services/:id" element={<DetailMenuPage />} />

        {/* buyer */}
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-confirm" element={<ConfirmPayPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/review" element={<ReviewPage />} />
        <Route path="/orders/review/result" element={<ResultPage />} />
        <Route path="/orders/review/edit" element={<EditPage />} />

        {/* favorable */}
        <Route path="/favorable" element={<FavorablePage/>} />
        <Route path="/favorable/document" element={<DocumentPage/>} />
        <Route path="/favorable/document-buyer" element={<OfferBuyerPage/>} />
        <Route path="/favorable/document-buyer/edit/" element={<OfferBuyerEditPage/>} />
        <Route path="/favorable/document-buyer/detail/" element={<OfferBuyerDetailPage/>} />
        <Route path="/favorable/document-buyer/d-auth/" element={<OrderOfferPage/>} />


        {/* craft */}
        <Route path="/home/craftman" element={<HomeCompanyPage />} />
        <Route path="/home/craftman/product-detail" element={<DetailProduct />} />
        <Route path="/home/craftman/create-product" element={<CreateProductPage />} />
        <Route path="/home/craftman/show-product" element={<ProductNewPage />} />
        <Route path="/home/craftman/edit-product" element={<EditProductPage />} />
        <Route path="/home/craftman/rating-product" element={<RatingPage />} />
        <Route path="/home/craftman/buyer/confirm-product" element={<DetailBuyerPage />} />
      </Routes>
    </Router>
  )
}