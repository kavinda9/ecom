import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AppCotext } from "../context/AppContext";
import Nav from "../components/nav/Nav";
import Search from "../components/Search/Search";
import Footer from "../components/footer/Footer";
import ProductProfile from './ProductProfile.jsx';

function ShopListing() {

  const {backendUrl} = useContext(AppCotext);
  const [products, setProducts] = useState([]);
  const [isSelectProduct, setIsSelectProduct] = useState(false);

  const getProducts = async () => {
    try {
      
      const {data} = await axios.get(backendUrl+'/api/product/data');
      data.success ? setProducts(data.products) : toast.error(data.message);

    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    getProducts();
    
  },[])

  return (
    <div className="flex flex-col m-3">
      <Nav />
      <Search/>
      {
        !isSelectProduct &&
        <div className="bg-gray-100 min-h-screen px-4 py-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Shop Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div
                key={index}
                onClick={() => {setIsSelectProduct(product); }}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-4 flex flex-col cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-lg font-bold text-gray-800">{product.title}</h2>
                <p className="text-sm text-gray-500">{product.description.slice(0, 60)}...</p>
                <p className="text-green-600 font-semibold mt-2">Rs. {product.price.toLocaleString()}</p>
                <p className="text-xs text-gray-400 mt-1">Brand: {product.brand} | Category: {product.category}</p>
                <div className="flex items-center gap-1 text-yellow-500 text-sm mt-2">
                  {"★".repeat(Math.floor(product.rating))}
                  {product.rating % 1 >= 0.5 && "½"}
                  <span className="text-gray-500 text-xs ml-2">({product.rating})</span>
                </div>
                <p className={`text-xs font-medium mt-2 ${product.stockQuantity > 0 ? "text-green-600" : "text-red-500"}`}>
                  {product.stockQuantity > 0 ? `In Stock (${product.stockQuantity})` : "Out of Stock"}
                </p>
                <div className="mt-4 flex justify-between">
                  <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm">
                    Add to Cart
                  </button>
                  <button className="border border-green-600 text-green-600 px-3 py-1 rounded hover:bg-green-50 text-sm">
                    Buy Now
                  </button>
                </div>
                {product.variations?.length > 0 && (
                  <div className="mt-4 text-xs text-gray-500">
                    Variations:{" "}
                    {product.variations.map((v, idx) => (
                      <span key={idx} className="inline-block mr-2">
                        {v.size} / {v.color}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      }
      {
        isSelectProduct && 
        <ProductProfile isSelectProduct={isSelectProduct} setIsSelectProduct={(data) => setIsSelectProduct(data)} />
      }
      <Footer/>
    </div>
  );
};

export default ShopListing;
