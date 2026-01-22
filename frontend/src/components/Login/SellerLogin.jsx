import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AppCotext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

function SellerLogin() {
    const navigate = useNavigate();

    const {backendUrl, setIsLoggedin, setIsSelectLogin, setIsSeller, getSellerData} = useContext(AppCotext);

    const [isSelectRegister, setIsSelectRegister] = useState(false);
    
    const [companyName, setCompanyName] = useState('');
    const [contactName, setContactName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState({
        line: "",
        city: "",
        postalCode: "",
        country: "",
    });

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddress((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit =  async (e) => {
        e.preventDefault();

        axios.defaults.withCredentials = true;
        
        try {
            if(isSelectRegister) {
                const {data} = await axios.post(backendUrl + '/api/vendor/auth/register', {companyName, contactName, phone, address,email, password});
                
                if(data.success) {
                    setIsSeller(true);
                    getSellerData();
                    setIsLoggedin(true);
                    setIsSelectLogin(false);
                    navigate('/');
                }else{
                    toast.error(data.message);
                }
            }else{
                const {data} = await axios.post(backendUrl + '/api/vendor/auth/login', {email, password});

                if(data.success) {
                    setIsSeller(true);
                    getSellerData();
                    setIsLoggedin(true);
                    setIsSelectLogin(false);
                    navigate('/');
                }else{
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }

    }


    return (
    <div>
        {!isSelectRegister &&
            <div className="pt-10  flex items-center justify-center  px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
                    <h2 className="text-2xl font-bold text-green-600 text-center mb-6">
                    Seller Login
                    </h2>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                        </label>
                        <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        placeholder="seller@example.com"
                        required
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                        </label>
                        <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                        placeholder="••••••••"
                        required
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
                        >
                        Login
                        </button>
                    </div>
                    </form>

                    {/* Optional Links */}
                    <div className="mt-4 text-center text-sm text-gray-500">
                    Don’t have an account?{" "}
                    <p onClick={() => setIsSelectRegister(true)} className="text-green-600 font-medium hover:underline">
                        Register
                    </p>
                    </div>
                </div>
                </div>
        }

        {
            isSelectRegister && 
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold text-green-600 text-center mb-6">
                Seller Registration
                </h2>

                <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Company Name */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Company Name</label>
                    <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-400 focus:outline-none focus:ring-2"
                        placeholder="Your Company Pvt Ltd"
                        required
                    />
                    </div>

                    {/* Contact Name */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Name</label>
                    <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-400 focus:outline-none focus:ring-2"
                        placeholder="John Doe"
                        required
                    />
                    </div>

                    {/* Email */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-400 focus:outline-none focus:ring-2"
                        placeholder="seller@example.com"
                        required
                    />
                    </div>

                    {/* Phone */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-400 focus:outline-none focus:ring-2"
                        placeholder="+94 76 123 4567"
                        required
                    />
                    </div>

                    {/* Password */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-400 focus:outline-none focus:ring-2"
                        placeholder="••••••••"
                        required
                    />
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-700 mt-4">Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Line */}
                    <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Address Line</label>
                    <input
                        name="line"
                        value={address.line}
                        onChange={(e) => handleAddressChange(e)}
                        type="text"
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-400 focus:outline-none focus:ring-2"
                        placeholder="218/4/1, Warahanthuduwa, Mahara, Kadawatha"
                        required
                    />
                    </div>

                    {/* City */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                        type="text"
                        name="city"
                        onChange={(e) => handleAddressChange(e)}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-400 focus:outline-none focus:ring-2"
                        placeholder="Colombo"
                        required
                    />
                    </div>

                    {/* Postal Code */}
                    <div>
                    <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                    <input
                        type="text"
                        name="postalCode"
                        onChange={(e) => handleAddressChange(e)}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-400 focus:outline-none focus:ring-2"
                        placeholder="11010"
                        required
                    />
                    </div>

                    {/* Country */}
                    <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Country</label>
                    <input
                        type="text"
                        name="country"
                        onChange={(e) => handleAddressChange(e)}
                        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-400 focus:outline-none focus:ring-2"
                        placeholder="Sri Lanka"
                        required
                    />
                    </div>
                </div>

                {/* Submit */}
                <div>
                    <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition"
                    >
                    Register
                    </button>
                </div>
                </form>

                {/* Optional Login Link */}
                <div className="mt-4 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <p onClick={() => setIsSelectRegister(false)} className="text-green-600 font-medium hover:underline">
                    Login here
                </p>
                </div>
            </div>
            </div>
                }
            </div>
  );
}

export default SellerLogin;