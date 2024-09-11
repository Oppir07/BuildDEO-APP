import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Auth/login";
import RegisterPage from "./pages/Auth/register";
import Home from "./pages/Home";
import MenuPage from "./pages/Menu";
import DetailMenuPage from "./pages/Menu/detail";
import PaymentPage from "./pages/Menu/payment";
import ProfilePage from "./pages/Profile";
import OrdersPage from "./pages/Profile/orders";
import ResultPage from "./pages/Profile/Review/result";
import ReviewPage from "./pages/Profile/Review/review";
import EditPage from "./pages/Profile/Review/edit";
import PrinciplePage from "./pages/Principle";
import HomeCompanyPage from "./pages/Craftman/Home";
import DetailProduct from "./pages/Craftman/Product/detail";
// import Home from "./pages/Home";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu-detail" element={<DetailMenuPage />} />
        <Route path="/menu-detail/payment" element={<PaymentPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/review" element={<ReviewPage />} />
        <Route path="/orders/review/result" element={<ResultPage />} />
        <Route path="/orders/review/edit" element={<EditPage />} />
        <Route path="/principle" element={<PrinciplePage />} />

        {/* Craftman */}
        <Route path="/home/craftman" element={<HomeCompanyPage/>}/>
        <Route path="/home/craftman/product-detail" element={<DetailProduct/>}/>
        
      </Routes>
    </Router>
  )
}