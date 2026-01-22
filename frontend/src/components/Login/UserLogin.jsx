import { useContext, useState } from "react";
import { assets } from "../../assets/Login/assestsLogin";
import axios from 'axios';
import { AppCotext } from "../../context/AppContext";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";

function UserLogin({setForgetPassword, setIsUser}) {
    
    const [state, setState] = useState('Login');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');

    const navigate = useNavigate();

    const {backendUrl, setIsLoggedin, setIsSelectLogin, getUserData, getCartData} = useContext(AppCotext);

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();

            axios.defaults.withCredentials = true;
            

            if(state == 'Sign Up') {

              if ( !(password == conPassword) ) {
                toast.error("Didn't match password")
              }else{
                const {data} = await axios.post(backendUrl + '/api/customer/auth/register', {name, email, password})

                if(data.success) {
                    setIsLoggedin(true);
                    setIsSelectLogin(false);
                    getUserData();
                    getCartData();
                    navigate('/');
                }else {
                    toast.error(data.message);
                }
              }
            }else {
              const {data} = await axios.post(backendUrl + '/api/customer/auth/login', {email, password});
              if(data.success) {
                setIsLoggedin(true);
                setIsSelectLogin(false);
                getUserData();
                getCartData();
                navigate('/');
              }else{
                toast.error(data.message);
              }
            }
            
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleLogin = () => {
      state == 'Sign Up' ? setState("Login") : setState('Sign Up') 
    }
    
    return (
    <div className="min-h-screen mt-10 flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-5xl flex flex-col md:flex-row">
        
        {/* Left Side Image/Illustration */}
        <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-6">
          <img
            src={assets.group} // Replace with your image path
            alt="Register Illustration"
            className="w-full max-w-xs md:max-w-sm"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-green-600">{state == 'Sign Up' ? "Register" : "Welcome Back"}</h2>
          <p className="text-gray-500 text-sm mb-6">{state == 'Sign Up' ?  "JOIN TO US" : "LOGIN TO CONTINUE"}</p>

          <form className="space-y-4" onSubmit={(e) => onSubmitHandler(e)}>
            {/* Name Input */}

            {(state == "Sign Up") && 
                <div>
                  <label className="block text-sm font-medium text-gray-700">Your name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jhon Deo"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
            }
            

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Example@gmail.com"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {(state != 'Sign Up') && 
              <p className="text-sm text-gray-500 underline cursor-pointer" onClick={() => {setForgetPassword(true); setIsUser(false);}}>Forget password?</p>}

            {/* Confiremd Password Input */}
            { (state == 'Sign Up') &&  
            <div>
                <label className="block text-sm font-medium text-gray-700">Confirmed Password</label>
                <input
                  type="password"
                  value={conPassword}
                  onChange={(e) => setConPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>}
            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              {state == 'Sign Up' ? 'REGISTER': "LOGIN"}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-sm text-gray-500 mt-4 text-center">
            {state == 'Sign Up' ? "ALREADY USER?" : "NEW USER" }{" "}
            <p onClick={() => handleLogin()} className="text-green-600 font-semibold hover:underline">
              {state == "Sign Up" ? "Log in" : "Register"}
            </p>
          </p>
        </div>
      </div>
    </div>
  );
}


export default UserLogin;