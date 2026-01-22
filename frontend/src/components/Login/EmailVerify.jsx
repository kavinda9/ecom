import { useContext, useRef, useState } from 'react';
import {assets} from '../../assets/Login/assestsLogin';  
import { AppCotext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function EmailVerify() {

    const inputRefs = useRef([]);
    const [otp, setOtp] = useState('');

    const {backendUrl,isSeller} = useContext(AppCotext);

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

    const navigate = useNavigate('/profile');

    const handleClick = async (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        try {
            
            const {data} = isSeller ? await axios.post(backendUrl + '/api/vendor/auth/verify-email',{otp}) : await axios.post(backendUrl + '/api/customer/auth/verify-account', {otp});

            if (data.success) {
                toast.success(data.message);
                navigate('/profile');
            }else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    return(
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
                                    handleClick(e);
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
                                onChange={(e) => handleClick(e)}
                                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                                >
                                Verify Code
                                </button>
                            </form>
                            </div>
                        </div>
                    </div>)
}

export default EmailVerify;