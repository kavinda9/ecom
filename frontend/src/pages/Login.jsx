import { useState } from "react";
import { assets } from "../assets/Login/assestsLogin";
import UserLogin from "../components/Login/UserLogin";
import SellerLogin from "../components/Login/SellerLogin";
import ForgetPassword from "../components/Login/ForgetPassword";
import Nav from "../components/nav/Nav";
import Search from "../components/Search/Search";
import Footer from "../components/footer/Footer";

function Login() {

  const [isSeller, setIsSeller] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isForgetPassword, setForgetPassword] = useState(false);

  return (
    <div className="flex flex-col m-3">
      <Nav />
      {!isSeller && !isUser && !isForgetPassword &&
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 ">
        <div className="w-full max-w-5xl bg-white p-8 rounded-2xl shadow-md flex flex-col items-center">
          <h2 className="text-3xl font-bold text-green-600 mb-2 text-center">
            Choose Your Role
          </h2>
          <p className="text-sm text-gray-500 mb-8 text-center">
            Select how you’d like to use our platform
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full">
            {/* Become a Seller */}
            <div className="border border-green-400 rounded-xl p-6 text-center hover:shadow-lg transition duration-300 cursor-pointer">
              <img
                src={assets.seller} // Place your image here (e.g., /public/images/seller.png)
                alt="Become a Seller"
                className="w-40 h-40 mx-auto mb-4"
              />
              <button onClick={() => {setIsSeller(true); setIsUser(false); setForgetPassword(false);}} className="bg-green-500 text-white py-2 px-6 rounded-full text-sm font-semibold hover:bg-green-600">
                Become a Seller
              </button>
              <p className="text-gray-500 mt-2 text-sm">Manage your shop</p>
            </div>

            {/* Start Shopping */}
            <div className="border border-green-400 rounded-xl p-6 text-center hover:shadow-lg transition duration-300 cursor-pointer">
              <img
                src={assets.user} // Place your image here (e.g., /public/images/buyer.png)
                alt="Start Shopping"
                className="w-40 h-40 mx-auto mb-4"
              />
              <button onClick={() => {setIsUser(true); setIsSeller(false); setForgetPassword(false);}}  className="bg-green-500 text-white py-2 px-6 rounded-full text-sm font-semibold hover:bg-green-600">
                Start Shopping
              </button>
              <p className="text-gray-500 mt-2 text-sm">
                Browse and buy products easily
              </p>
            </div>
          </div>
        </div>
        
      </div>
    }

    {isUser && <UserLogin setForgetPassword={(data) => setForgetPassword(data)} setIsUser={(data) => setIsUser(data)}/>}

    {isSeller && <SellerLogin  />}

    {isForgetPassword && <ForgetPassword setForgetPassword={(data) => setForgetPassword(data)} setIsUser={(data) => setIsUser(data)}/>}
      <Footer/>
    </div>
  );
}

export default Login;