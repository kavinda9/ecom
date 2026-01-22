import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AppCotext } from '../context/AppContext';

export default function AddProductPage({setIsAddProduct}) {

  const {backendUrl} = useContext(AppCotext);

  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    rating: '',
    stockQuantity: '',
    image: null,
    variations: [
      { size: '', color: '#1ABA1A', colorName: '', price: '', image: null }
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleMainImageChange = (e) => {
    setProduct(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleVariationChange = (index, e) => {
    const { name, value, files } = e.target;
    const newVariations = [...product.variations];
    newVariations[index][name] = files ? files[0] : value;
    setProduct(prev => ({ ...prev, variations: newVariations }));
    
  };

  const addVariation = () => {
    setProduct(prev => ({
      ...prev,
      variations: [...prev.variations, { size: '', color: '', price: '', image: null }]
    }));
  };

  const removeVariation = (index) => {
    const updated = product.variations.filter((_, i) => i !== index);
    setProduct(prev => ({ ...prev, variations: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;

    try {
      const formData = new FormData();

      // Append basic product fields
      formData.append('title', product.title);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('category', product.category);
      formData.append('brand', product.brand);
      formData.append('rating', product.rating);
      formData.append('stockQuantity', product.stockQuantity);

      // Append main product image
      if (product.image) {
        formData.append('image', product.image); // main image file
      }

      // Prepare variation data
      const variationData = product.variations.map((variation, index) => {
        // Append each variation image file
        if (variation.image) {
          formData.append('variationImages', variation.image);
        }

        // Return variation object without file, backend will assign Cloudinary path
        return {
          size: variation.size,
          color: variation.color,
          colorName: variation.colorName || "",
          price: variation.price,
          image: "" // placeholder, backend will fill in Cloudinary URL
        };
      });

      // Append variations as string
      formData.append('variations', JSON.stringify(variationData));

      // Submit request
      const { data } = await axios.post(`${backendUrl}/api/product/addProduct`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Show feedback
      if (data.success) {
        toast.success(data.message);
        setIsAddProduct(false);
      } else {
        toast.error(data.message || "Failed to create product");
      }

    } catch (error) {
      console.error("Product submit error:", error);
      toast.error(error?.response?.data?.message || error.message);
    }
  };
  const inputStyle = "input border-1 border-solid p-1.5";

  return (
    <div className="w-full min-h-screen bg-gray-100 py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Add New Product</h1>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Grid: Left-Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* === Left Section === */}
            <div className="space-y-6 flex flex-col">
              <input
                type="text"
                name="title"
                placeholder="Product Title"
                value={product.title}
                onChange={handleChange}
                className={inputStyle}
                required
              />

              <textarea
                name="description"
                placeholder="Product Description"
                rows={4}
                value={product.description}
                onChange={handleChange}
                className={inputStyle}
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={product.category}
                  onChange={handleChange}
                  className={inputStyle}
                />
                <input
                  type="text"
                  name="brand"
                  placeholder="Brand"
                  value={product.brand}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <input
                  type="number"
                  name="price"
                  placeholder="Base Price"
                  value={product.price}
                  onChange={handleChange}
                  className={inputStyle}
                />
                <input
                  type="number"
                  name="stockQuantity"
                  placeholder="Stock"
                  value={product.stockQuantity}
                  onChange={handleChange}
                  className={inputStyle}
                />
                <input
                  type="number"
                  name="rating"
                  placeholder="Rating (1-5)"
                  value={product.rating}
                  onChange={handleChange}
                  className={inputStyle}
                  min={1}
                  max={5}
                />
              </div>

            </div>

            {/* === Right Section === */}
            <div className="space-y-6 flex flex-col justify-center items-center">
              {/* Upload Main Image */}
              <div>
                <label className="block font-medium mb-1">Main Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageChange}
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-green-600 file:text-white hover:file:bg-green-700"
                />
                {product.mainImage && (
                  <img
                    src={URL.createObjectURL(product.mainImage)}
                    alt="Main Preview"
                    className="mt-4 h-40 object-cover rounded"
                  />
                )}
              </div>
            </div>
          </div>

          {/* === Variations Section === */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Product Variations</h2>

            {product.variations.map((v, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end mb-4 p-4 bg-gray-50 rounded shadow-sm">

                <select
                  name="size"
                  value={v.size}
                  onChange={(e) => handleVariationChange(index, e)}
                  className="input"
                >
                  <option value="">Select Size</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>

                <div>
                  {/* <input
                    type="color"
                    name="color"
                    value={v.color}
                    onChange={(e) => handleVariationChange(index, e)}
                    className="w-full h-10 border rounded"
                  /> */}
                  <input
                    type="text"
                    name="color"
                    placeholder="Color Name"
                    value={v.color}
                    onChange={(e) => handleVariationChange(index, e)}
                    className="input mt-1"
                  />
                </div>

                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={v.price}
                  onChange={(e) => handleVariationChange(index, e)}
                  className="input"
                />

                <div>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => handleVariationChange(index, e)}
                    className="block text-sm file:py-2 file:px-3 file:bg-green-600 file:text-white hover:file:bg-green-700 rounded"
                  />
                  {v.image && (
                    <img
                      src={URL.createObjectURL(v.image)}
                      alt="Variation Preview"
                      className="mt-2 h-20 rounded"
                    />
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => removeVariation(index)}
                  className="text-red-600 hover:underline font-medium"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addVariation}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              + Add Variation
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-700 text-white font-semibold rounded text-lg hover:bg-green-800"
          >
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
}
