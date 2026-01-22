import React, { useContext, useState } from 'react';
import { AppCotext } from '../../context/AppContext';
import { useEffect } from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';


function CheckoutPage({setIsSelectCheckout, setIsOrder}) {
  const [billingInfo, setBillingInfo] = useState({
    street: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    notes: '',
    createAccount: false,
  });

  const {items, getTheCart, setItem } = useContext(AppCotext);

  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [line, setLine] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');


  const {userData, getUserData, backendUrl} = useContext(AppCotext);

  const orderSummary = {
    items: [
      {
        name: 'Pineapple Macbook Pro 2022 M1 512GB',
        quantity: 3,
        price: 1746.50,
      },
    ],
    shipping: 'Free',
    extraShippingCost: 9.5,
    total: 1746.5,
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBillingInfo((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if(e.target.checked) {
      getUserData();
      setName(userData.name);
      setCity(userData.address.city);
      setLine(userData.address.line);
      setPostalCode(userData.address.postalCode);
      setPhone(userData.phone)
      setEmail(userData.email);
      setPhone(userData.phone);
    }else{
      setName('');
      setCity('');
      setLine('');
      setPostalCode('')
      setPhone('');
      setEmail('');
    }
  };

  const handleAddToOrder = async () => {
    const shippingAddress = {line, city, postalCode};

    try {
      const {data} = await axios.post(backendUrl + '/api/order/add', {shippingAddress, items} );
      console.log(data);
      if(data.success) {
        toast.success(data.message);
        setIsOrder(true);
        setIsSelectCheckout(false);
      }else {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

  };

  useEffect(() => {
    getTheCart()
  },[]);

  const style = "input mr-20 border-1 p-2" ;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Billing Details */}
        <form className="space-y-4 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
          <input name="company" placeholder="contact name" value={name} className={style} onChange={handleInputChange} />
          <input name="country" placeholder="Town / City*" value={city} className={style} onChange={handleInputChange} />
          <input name="street" placeholder="Street Address *" value={line} className={style} onChange={handleInputChange} />
          <input name="state" placeholder="State / County *" className={style} onChange={handleInputChange} />
          <input name="zip" placeholder="Zip Code *" value={postalCode} className={style} onChange={handleInputChange} />
          <input name="phone" placeholder="Phone *" className={style} value={phone} onChange={(e) => {handleInputChange(e); setPhone(e.target.value)}}  />
          <input name="email" placeholder="Email *" className={style} value={email} onChange={(e) => {handleInputChange(e); setEmail(e.target.value)} } />
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="yourAddress" onChange={(e) => handleInputChange(e)} />
            <span>Your Address</span>
          </label>
        </form>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-xl font-semibold">Your Order</h2>
          <div className="border rounded-lg p-4 space-y-2">
            {items.map((item, idx) => (
              <div key={idx} className="flex justify-between">
                <span>{item.title} × {item.quantity}</span>
                <span>LKR {item.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm text-gray-600">
              <span>Standard Shipping</span>
              <span>{orderSummary.shipping}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Additional Cost</span>
              <span>+LKR 0</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{items.reduce((total, item) => total + item.quantity * item.price, 0).toLocaleString("en-LK", { style: "currency", currency: "LKR" })}</span>
            </div>
          </div>

          {/* Payment Options */}
          <div className="space-y-2">
            {['Direct Bank Transfer', 'Cash on Delivery', 'PayPal'].map((method, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input type="radio" name="paymentMethod" value={method} defaultChecked={index === 0} />
                <span>{method}</span>
              </label>
            ))}
          </div>

          <button onClick={() => {
            handleAddToOrder();
            
          }} className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded transition">
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;