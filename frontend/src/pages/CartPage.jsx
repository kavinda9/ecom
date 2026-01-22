import Nav from "../components/nav/Nav";
import Search from "../components/Search/Search";
import Footer from "../components/footer/Footer";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CheckoutPage from "../components/cart/CheckoutPage";
import OrderConfirmation from "../components/cart/OrderConfirmation";
import { AppCotext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const CartPage = () => {

  const {items, getTheCart } = useContext(AppCotext);

  useEffect(() => {
    getTheCart();
  },[])

  const [isSelectCheckout, setIsSelectCheckout] = useState(false);
  const [isOrder, setIsOrder] = useState(false);

  return (
    <div className="flex flex-col m-3">
      <Nav />
      <Search/>
      {!isSelectCheckout && !isOrder &&
          <div className="bg-gray-50 min-h-screen p-8 relative">
            <button className="absolute right-0 top-0 mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition" onClick={() => setIsOrder(true)}>Checkout</button>
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 space-y-6">
            {items.map((item,index) => (
              <div key={index} className="bg-white shadow p-6 rounded-lg flex items-center gap-4">
                <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded" />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-500">
                    Price: <span className="text-black font-semibold">${item.price}</span>
                    {item.discount > 0 && (
                      <span className="ml-2 text-green-500">Save ${item.price}</span>
                    )}
                  </p>
                  <p className="text-sm text-gray-600">{item.color}</p>
                  <p className={`text-sm ${item.stock ? 'text-green-600' : 'text-red-600'}`}>
                    {item.size}
                  </p>
                </div>
                <input type="number" value={item.quantity} className="w-16 border rounded px-2 py-1" />
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3 bg-white shadow rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Sub Total</span>
                <span>{items.reduce((total, item) => total + item.quantity * item.price, 0).toLocaleString("en-LK", { style: "currency", currency: "LKR" })}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping estimate</span>
                <span>LKR. 600</span>
              </div>
              <div className="flex justify-between">
                <span>Tax estimate</span>
                <span>LKR. 500</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{(items.reduce((total, item) => total + item.quantity * item.price, 0) + 700 ).toLocaleString("en-LK", { style: "currency", currency: "LKR" })}</span>
              </div>
              <button onClick={() => setIsSelectCheckout(true)} className="w-full mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition">
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
          </div>
      }

      {isSelectCheckout &&  <CheckoutPage setIsSelectCheckout={(data) => setIsSelectCheckout(data)} setIsOrder={(data) => setIsOrder(data)} /> }
      {isOrder && <OrderConfirmation/> }
      <Footer/>
    </div>
  );
};

export default CartPage;