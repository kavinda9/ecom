import { useContext, useRef, useState } from "react";
import { assets } from "../../assets/Login/assestsLogin";
import { AppCotext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function ForgetPassword({setForgetPassword, setIsUser}) {

    const {backendUrl, isLoggedin, isSeller, getUserData} = useContext(AppCotext);

    const [email, setEmail] = useState('');
    const [isSentRestOtp, setIsSentRestOtp] = useState(false);
    const [isResetPassword, setResetPassword] = useState(false);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [conPassword, setConPassword] = useState('');
    const inputRefs = useRef([]);

    const navigate = useNavigate();

    const handleChange = (e, index) => {
        const value = e.target.value;

        if (/^[0-9]$/.test(value)) {
        // Move to next input
        if (index < 5) {
            inputRefs.current[index + 1].focus();
        }
        } else {
        // Clear non-numeric values
        e.target.value = "";
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
        inputRefs.current[index - 1].focus();
        }
    };

    // Handle for the email to otp
    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.defaults.allowAbsoluteUrls = true;

        try {
            
            const {data} = isSeller ? await axios.post(backendUrl+'/api/vendor/auth/send-reset-otp', {email}) : await axios.post(backendUrl + '/api/customer/auth/sent-reset-otp', {email});

            if(data.success) {
                toast.success(data.message);
                setIsSentRestOtp(true);
            }else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }

    };

    //Chanage password
    const handleSubmitReset = async (e) => {
        e.preventDefault();
        
        axios.defaults.allowAbsoluteUrls = true;

        try {
            
            if(conPassword != newPassword) {
                toast.error("Password doesn't match");
            }else {

                const {data} = isSeller ? await axios.post(backendUrl+'/api/vendor/auth/reset-password', {email, otp, newPassword}) : await axios.post(backendUrl+'/api/customer/auth/reset-password', {email, otp, newPassword})
                
                if(data.success) {
                    toast.success(data.message);
                    navigate('/profile')
                    //setForgetPassword(false);
                    //setIsUser(true);
                }else{
                    toast.error(data.message);
                }

            }

        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div>
            { !isSentRestOtp  && !isResetPassword &&
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                    <div className="max-w-4xl w-full bg-white shadow-md rounded-2xl flex flex-col md:flex-row overflow-hidden">
                        {/* Image Section */}
                        <img src={assets.forget} className="hidden md:block md:w-1/2 bg-cover bg-center w-md" />
                        {/* Form Section */}
                        <div className="w-full md:w-1/2 p-8">
                        <h2 className="text-2xl font-bold text-green-600 mb-4">{!isLoggedin? "Forgot your password?" :  "Change Password"}</h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Don’t worry! Enter your email address and we’ll send you a code to reset your password.
                        </p>
                        <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
                            <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                            required
                            />
                            <button
                            type="submit"
                            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                            >
                            Send Reset Code
                            </button>
                        </form>
                        </div>
                    </div>
                    </div>
            }
            {isSentRestOtp &&
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                    <div className="max-w-4xl w-full bg-white shadow-md rounded-2xl flex flex-col md:flex-row overflow-hidden">
                        {/* Image */}
                        <img
                        className="hidden md:block md:w-1/2 bg-cover bg-center" src={assets.verifyOtp} />

                        {/* Code Input */}
                        <div className="w-full md:w-1/2 p-8">
                        <h2 className="text-2xl font-bold text-green-600 mb-4">Enter Verification Code</h2>
                        <p className="text-sm text-gray-500 mb-6">
                            We sent a 6-digit code to your email. Please enter it below to verify your identity.
                        </p>

                        <form onSubmit={(e) => { 
                                e.preventDefault(); 
                                setIsSentRestOtp(false); 
                                setResetPassword(true); 
                                setOtp(inputRefs.current.map((input) => input.value).join(""));
                            }}>
                            <div className="grid grid-cols-6 gap-2 mb-4">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                maxLength="1"
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-full py-2 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                                />
                            ))}
                            </div>

                            <button
                            type="submit"
                            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                            >
                            Verify Code
                            </button>
                        </form>
                        </div>
                    </div>
                </div>
            }

            {
                isResetPassword && 
                <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                    <div className="max-w-4xl w-full bg-white shadow-md rounded-2xl flex flex-col md:flex-row overflow-hidden">
                        {/* Image */}
                        <img className="hidden md:block md:w-1/2 bg-cover bg-center" src={assets.resetPass}/>

                        {/* Form */}
                        <div className="w-full md:w-1/2 p-8">
                        <h2 className="text-2xl font-bold text-green-600 mb-4">Set New Password</h2>
                        <p className="text-sm text-gray-500 mb-6">
                            Your new password must be different from previously used passwords.
                        </p>
                        <form className="space-y-4" onSubmit={handleSubmitReset}>
                            <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                            required
                            />
                            <input
                            type="password"
                            placeholder="Confirm Password"
                            value={conPassword}
                            onChange={(e) => setConPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
                            required
                            />
                            <button
                            type="submit"
                            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                            >
                            Reset Password
                            </button>
                        </form>
                        </div>
                    </div>
                </div>
            }
        </div>
    
  );
}

export default ForgetPassword;