import Nav from '../components/nav/Nav';
import Footer from '../components/footer/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AppCotext } from '../context/AppContext';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useEffect } from 'react';

function UserProfile() {

  // App context 
  const {backendUrl, setIsLoggedin, userData, getUserData, isSeller, setIsSeller} = useContext(AppCotext);

  // Use to navigate page
  const navigate = useNavigate();

  //User attributes
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [line, setLine] = useState(' ');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');

  useEffect(() => {
    userData && getUserData();
    if(userData && !isSeller) {
      setFirstName( userData.name ? userData.name.split(" ")[0] : '');
      setLastName(userData.name.split(" ")[1]);
      setLine(userData.address.line);
      setCity(userData.address.city);
      setPostalCode(userData.address.postalCode);
    }else if (userData && isSeller) {
      setCompanyName(userData.companyName);
      setContactName(userData.contactName);
      setLine(userData.address.line);
      setCity(userData.address.city);
      setPostalCode(userData.address.postalCode);
    }
    setEmail(userData.email);
    setPhone(userData.phone);
    
  },[userData]);

  //Logout method
  const onSubmitButton = async (item) => {
    axios.defaults.withCredentials = true;
    try {

      if (item == 'Logout') {
      
        const {data} =  !isSeller ? await axios.post(backendUrl + '/api/customer/auth/logout') 
                                  :  await axios.post(backendUrl + '/api/vendor/auth/logout');

        if (data.success) {
          setIsLoggedin(false);
          setIsSeller(false);
          navigate('/');
          toast.success(data.message);
        }

      }else if (item == 'Change Password') {
        navigate('/changePass');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Upadate user details
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.allowAbsoluteUrls = true;
    try {
      const {data} = !isSeller ?  await axios.post(backendUrl + "/api/customer/update", {
        name: firstName + " " + lastName,
        email,
        phone,
        address: {
          line,
          city,
          postalCode
        }
      })                       : await axios.post(backendUrl + '/api/vendor/update', 
                                {companyName, contactName, email, phone, address: {line, city, postalCode},});

      if(data.success) {
        toast.success(data.message)
      }else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  //Account verify email 
  const sendVerifyEmail = async (e) => {

    e.preventDefault();
    axios.defaults.allowAbsoluteUrls = true;

    try {
      const {data} = isSeller ? await axios.post(backendUrl + '/api/vendor/auth/send-verify-otp') : await axios.post(backendUrl + '/api/customer/auth/send-verify-otp');

      if(data.success) {
        navigate('/emailVerify');
        toast.success(data.message);
      }else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }
  

  return (
    <div className="flex flex-col m-3">
      <Nav />
      {!isSeller &&
          <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex flex-col lg:flex-row bg-white shadow rounded-lg overflow-hidden">
          {/* Sidebar */}
          <aside className="lg:w-1/4 bg-gray-100 p-6 space-y-4">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mb-2"></div>
              <h2 className="text-lg font-semibold">{userData.name}</h2>
              <p className="text-sm text-gray-600">{userData.email}</p>
            </div>
            <nav className="space-y-2">
              {['Account Info', 'My Orders', 'My Address', 'Change Password', 'Logout'].map((item, i) => (
                <button
                  onClick={() => onSubmitButton(item)}
                  key={i}
                  className="flex justify-between w-full bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-green-100 transition"
                >
                  <span>{item}</span>
                  <span>➔</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Form Area */}
          <main className="flex-1 p-6">
            <h1 className="text-2xl font-bold mb-6">Account Info {userData.isAccountVerified ? <span className='font-medium text-blue-400'>(Verified)</span> : <span className='font-medium text-red-500'>(Not verified)</span>} </h1>
            <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name *</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name *</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder='Enter the phone number'
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address Line *</label>
                <input
                  type="tel"
                  value={line}
                  onChange={(e) => setLine(e.target.value)}
                  placeholder='Enter the Address Line'
                  className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder='Enter the City/Town'
                    required
                    className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Postal Code *</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder='Enter the Postal Code'
                    required
                    className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className='flex flex-row justify-evenly items-center'>
                  <button
                    type="submit"
                    className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded transition"
                  >
                    SAVE
                  </button>
                  {
                    !userData.isAccountVerified && 
                    <button 
                     
                      onClick={sendVerifyEmail}
                      className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded transition"
                    >
                      Verify Email
                    </button>
                  }
                  
              </div>
              
            </form>
          </main>
        </div>
      </div>
      }
      
      {
        isSeller && 
          <div className="min-h-screen bg-gray-50 p-6">
          <div className="flex flex-col lg:flex-row bg-white shadow rounded-lg overflow-hidden">
            {/* Sidebar */}
            <aside className="lg:w-1/4 bg-gray-100 p-6 space-y-4">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-300 rounded-full mb-2"></div>
                <h2 className="text-lg font-semibold">{companyName}</h2>
                <p className="text-sm text-gray-600">{email}</p>
              </div>
              <nav className="space-y-2">
                {['Account Info', 'My Orders', 'Change Password', 'Logout'].map((item, i) => (
                  <button
                    onClick={() => onSubmitButton(item)}
                    key={i}
                    className="flex justify-between w-full bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-green-100 transition"
                  >
                    <span>{item}</span>
                    <span>➔</span>
                  </button>
                ))}
              </nav>
            </aside>

            {/* Main Form Area */}
            <main className="flex-1 p-6">
              <h1 className="text-2xl font-bold mb-6">Account Info {userData.isAccountVerified ? <span className='font-medium text-blue-400'>(Verified)</span> : <span className='font-medium text-red-500'>(Not verified)</span>} </h1>
              <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company Name*</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                      className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contact Name *</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required
                      className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder='Enter the phone number'
                    className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address Line *</label>
                  <input
                    type="tel"
                    value={line}
                    onChange={(e) => setLine(e.target.value)}
                    placeholder='Enter the Address Line'
                    className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder='Enter the City/Town'
                      required
                      className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Postal Code *</label>
                    <input
                      type="text"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder='Enter the Postal Code'
                      required
                      className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                <div className='flex flex-row justify-evenly items-center'>
                    <button 
                      type="submit"
                      className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded transition"
                    >
                      SAVE
                    </button>
                    {
                      !userData.isAccountVerified && 
                      <button 
                      
                        onClick={sendVerifyEmail}
                        className="mt-6 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded transition"
                      >
                        Verify Email
                      </button>
                    }
                    
                </div>
                
              </form>
            </main>
          </div>
        </div>
      }
      
      <Footer/>
    </div>
  );
};

export default UserProfile;