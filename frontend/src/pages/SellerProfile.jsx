import React, { useState } from 'react';
import Nav from '../components/nav/Nav';
import Footer from '../components/footer/Footer';

export default function SellerProfile() {
  const [seller, setSeller] = useState({
    vendorId: '',
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    address: {
      line: '',
      city: '',
      postalCode: '',
      country: ''
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('address.')) {
      const addressKey = name.split('.')[1];
      setSeller((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressKey]: value
        }
      }));
    } else {
      setSeller((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Seller Profile:', seller);
    // Send to backend here
  };

  return (
    <div className="flex flex-col m-3">
      <Nav />
      <div className="w-full min-h-screen bg-gray-100 py-10 px-6 md:px-12">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Seller Profile</h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="vendorId"
                placeholder="Vendor ID"
                value={seller.vendorId}
                onChange={handleChange}
                className="input"
              />

              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={seller.companyName}
                onChange={handleChange}
                className="input"
                required
              />

              <input
                type="text"
                name="contactName"
                placeholder="Contact Person Name"
                value={seller.contactName}
                onChange={handleChange}
                className="input"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={seller.email}
                onChange={handleChange}
                className="input"
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={seller.phone}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <h3 className="text-xl font-semibold text-gray-700 pt-4">Address</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="address.line"
                placeholder="Address Line"
                value={seller.address.line}
                onChange={handleChange}
                className="input"
                required
              />

              <input
                type="text"
                name="address.city"
                placeholder="City"
                value={seller.address.city}
                onChange={handleChange}
                className="input"
                required
              />

              <input
                type="text"
                name="address.postalCode"
                placeholder="Postal Code"
                value={seller.address.postalCode}
                onChange={handleChange}
                className="input"
                required
              />

              <input
                type="text"
                name="address.country"
                placeholder="Country"
                value={seller.address.country}
                onChange={handleChange}
                className="input"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-green-700 text-white text-lg rounded font-semibold hover:bg-green-800"
            >
              Save Seller Profile
            </button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}