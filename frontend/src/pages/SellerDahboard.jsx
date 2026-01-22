
import  { useEffect, useState } from 'react';
import Nav from '../components/nav/Nav';
import Footer from '../components/footer/Footer';
import AddProducts from './AddProducts'
import { useContext } from 'react';
import { AppCotext } from '../context/AppContext';
import axios from 'axios';


function SellerDashboard() {

    const {userData, products, getProducts, setProducts} = useContext(AppCotext);

    const vendor = {
        vendorId: "VND001",
        companyName: "TechWorld Electronics",
        contactName: "Saranga Samarakoon",
        email: "contact@techworld.lk",
        phone: "+94 77 123 4567",
        address: {
            line: "218/4/1, Warahanthuduwa, Mahara, Kadawatha",
            city: "Colombo",
            postalCode: "11010",
            country: "Sri Lanka"
        }
    };

    

    const initialProducts = [
    {
        productId: "P001",
        title: "Gaming Headset",
        description: "Surround Sound RGB headset with mic",
        price: 12000,
        image: "https://via.placeholder.com/100x100.png?text=Headset",
        category: "Audio",
        brand: "Logitek",
        rating: 4.2,
        variations: [
        {
            size: "Standard",
            color: "Black",
            price: 12000,
            image: "https://via.placeholder.com/100x100.png?text=Black"
        }
        ],
        stockQuantity: 12,
        vendorId: "VND001"
    },
    {
        productId: "P002",
        title: "Wireless Mouse",
        description: "Bluetooth ergonomic mouse",
        price: 4500,
        image: "https://via.placeholder.com/100x100.png?text=Mouse",
        category: "Accessories",
        brand: "SwiftTech",
        rating: 4.6,
        variations: [],
        stockQuantity: 3,
        vendorId: "VND001"
    }
    ];

  
  const [isAddProduct, setIsAddProduct] = useState(false);

  useEffect(() => {
    getProducts()
  },[])

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.productId !== productId));
    }
  };

  const totalProducts = products?.length;
  const lowStockCount = products && products?.filter(p => p.stockQuantity <= 5).length;

  return (
    <div className="flex flex-col m-3">
      <Nav />
      {!isAddProduct && 
        <div className="min-h-screen bg-gray-50 p-6">
          <h1 className="text-2xl font-bold mb-4">Seller Dashboard</h1>
          {/* Seller Info */}
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-2">{userData.companyName}</h2>
            <p className="text-sm text-gray-600">Contact: {userData.contactName}</p>
            <p className="text-sm text-gray-600">Email: {userData.email}</p>
            <p className="text-sm text-gray-600">Phone: {userData.phone}</p>
            <p className="text-sm text-gray-600">
              Address: {userData?.address?.line}, {userData?.address?.city}, {userData?.address?.postalCode}
            </p>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <p className="text-sm text-gray-500">Total Products</p>
              <h2 className="text-xl font-bold">{totalProducts}</h2>
            </div>
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <p className="text-sm text-gray-500">Low Stock</p>
              <h2 className="text-xl font-bold text-red-500">{lowStockCount}</h2>
            </div>
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <p className="text-sm text-gray-500">Avg. Rating</p>
              <h2 className="text-xl font-bold text-yellow-500">
                {products?.length > 0 ? (products?.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1) : '0.0'}
              </h2>
            </div>
            <div className="bg-white p-4 rounded-xl shadow text-center">
              <p className="text-sm text-gray-500">Vendor ID</p>
              <h2 className="text-base font-mono text-gray-600">V001</h2>
            </div>
          </div>

          {/* Product Table */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className='flex flex-row justify-between items-center px-5'>
              <h2 className="text-lg font-semibold mb-4">Products</h2>
              <button onClick={() => setIsAddProduct(true)} className='mb-4 bg-green-500 text-white px-4 py-1 rounded-sm cursor-pointer hover:opacity-85'>Add products</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">Image</th>
                    <th className="px-4 py-2">Title</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Stock</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Rating</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products && products.map((product, i) => (
                    <tr key={i} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">
                        <img src={product.image} alt={product.title} className="w-12 h-12 object-cover rounded" />
                      </td>
                      <td className="px-4 py-2">{product.title}</td>
                      <td className="px-4 py-2">{product.category}</td>
                      <td className="px-4 py-2">{product.stockQuantity}</td>
                      <td className="px-4 py-2">Rs.{product.price}</td>
                      <td className="px-4 py-2 text-yellow-500">⭐ {product.rating}</td>
                      <td className="px-4 py-2">
                        <button className="text-red-600 text-xs" onClick={() => handleDeleteProduct(product.productId)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }
      {isAddProduct && <AddProducts setIsAddProduct={(data) => setIsAddProduct(data)}/>}
      <Footer/>
    </div>
  );
};

export default SellerDashboard;