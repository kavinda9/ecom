import Home from "./pages/Home"
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import { ToastContainer } from "react-toastify"
import ForgetPassword from "./components/Login/ForgetPassword.jsx";
import ShopListing from "./pages/ShopListing";
import CartPage from "./pages/CartPage";
import UserProfile from "./pages/UserProfile";
import SellerDashboard from "./pages/SellerDahboard.jsx";
import EmailVerify from "./components/Login/EmailVerify.jsx";
import OrderConfirmation from "./components/cart/OrderConfirmation.jsx";

function App() {
  return(
    <div>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/forget-password" element={<ForgetPassword/>} />
        <Route path="/products" element={<ShopListing/>} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/profile" element={<UserProfile/>} />
        <Route path="/sellerDashboard" element={<SellerDashboard/> } />
        <Route path="/emailVerify" element={<EmailVerify/>} />
        <Route path="/changePass" element={<ForgetPassword/>} />
        <Route path="/orderCon" element={<OrderConfirmation/>} />
        <Route path="/dashboard" element={<SellerDashboard/>} />
      </Routes>
    </div>
  )
}

export default App
