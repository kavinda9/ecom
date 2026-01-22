import { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/homePage/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppCotext } from '../context/AppContext';

const ProductProfile = ({isSelectProduct, setIsSelectProduct}) => {
  
  const [selectedVariation, setSelectedVariation] = useState(isSelectProduct.variations[0]._id);
  const [quantity, setQuantity] = useState(1);
  
  const {backendUrl} = useContext(AppCotext);

  const handleAddToCart = async () => {

    axios.defaults.allowAbsoluteUrls = true;

    try {
      const item = isSelectProduct.variations.find(item => item._id == selectedVariation);
      const {data} = await axios.post(backendUrl+'/api/cart/add', {productId: isSelectProduct._id, item , lastUpdated : Date.now(), quantity});
      if(data) {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

  };

  useEffect(() => {
    console.log(isSelectProduct);
  },[])

  return (
    <div className="min-h-screen relative bg-gray-50 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-lg shadow p-6">
        <img onClick={() => setIsSelectProduct(false)} className='absolute w-15 cursor-pointer' title='Back' src={assets.leftArrow} />
        {/* Product Image */}
        <div className="flex justify-center items-center">
          <img
            src={ selectedVariation ? isSelectProduct.variations.find((item) => item._id == selectedVariation).image : isSelectProduct.image}
            alt={isSelectProduct.title}
            className="rounded-lg w-full max-w-sm object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{isSelectProduct.title}</h1>
          <div className="text-gray-600 text-sm">
            <p><strong>Brand:</strong> {isSelectProduct.brand}</p>
            <p><strong>Category:</strong> {isSelectProduct.category}</p>
            <div className="flex items-center gap-1 text-yellow-500 text-sm mt-2">
                  {"★".repeat(Math.floor(isSelectProduct.rating))}
                  {isSelectProduct.rating % 1 >= 0.5 && "½"}
                  <span className="text-gray-500 text-xs ml-2">({isSelectProduct.rating})</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 whitespace-pre-line">{isSelectProduct.description}</p>
          {
            isSelectProduct && 
            <div>
              {/* Color Selector */}
              <div>
                <p className="font-semibold mb-2">Color:</p>
                <div className="flex gap-2">
                  {isSelectProduct.variations.map((items) => (
                    <button
                      key={items._id}
                      onClick={() => setSelectedVariation(items._id)}
                      className={`cursor-pointer px-3 py-1 rounded border ${selectedVariation === items._id ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`}
                    >
                      {items.color}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Size Selector */}
              <div>
                <p className="font-semibold mb-2">Size:</p>
                <div className="flex gap-2">
                  {isSelectProduct.variations.map((item) => (
                    <button
                      key={item._id}
                      onClick={() => setSelectedVariation(item._id)}
                      className={`cursor-pointer px-3 py-1 rounded border ${selectedVariation === item._id ? 'bg-green-500 text-white' : 'bg-white text-gray-700'}`}
                    >
                      {item.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="text-xl font-bold text-green-600">
                Rs. { isSelectProduct.variations.find((item) => item._id == selectedVariation).price.toFixed(2)}{' '}
                <span className="text-gray-500 line-through text-base ml-2">${isSelectProduct.price.toFixed(2)}</span>
              </div>
              

              {/* Quantity */}
              <div className="flex items-center gap-4 mt-2">
                <label htmlFor="qty">Qty:</label>
                <input
                  id="qty"
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-16 border rounded px-2 py-1"
                />
              </div>
            </div>
            
          }

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            <button onClick={handleAddToCart} className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition">Add to Cart</button>
            <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">Buy with PayPal</button>
            <button className="border px-6 py-2 rounded text-gray-600 hover:text-black">Add to Wishlist</button>
          </div>

          {/* Shipping & Warranty */}
          <p className="text-sm text-gray-600 mt-4">Stock Quantity : {isSelectProduct.stockQuantity}</p>
          <p className="text-sm text-gray-600">Guaranteed Safe Checkout</p>
        </div>
      </div>
    </div>
  );
};

export default ProductProfile;