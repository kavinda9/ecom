const ProductCard = () => {

    const product = {
        "title": "Men's Casual Slim Fit Shirt",
        "description": "Comfortable and stylish slim fit shirt perfect for everyday wear.",
        "price": 2990,
        "image": "https://example.com/images/shirt1.jpg",
        "category": "Clothing",
        "brand": "Arrow",
        "rating": 4.3,
        "variations": [
        {
            "size": "M",
            "color": "Blue",
            "price": 2990,
            "image": "https://example.com/images/shirt1-blue.jpg"
        },
        {
            "size": "L",
            "color": "White",
            "price": 2990,
            "image": "https://example.com/images/shirt1-white.jpg"
        }
        ],
        "stockQuantity": 25,
        "vendorId": "v001"
    };


    const vendor = {
        vendorId: "VND001",
        name: "TechWorld Electronics",
        logo: "https://example.com/images/vendors/techworld-logo.png", // ideally 100x100px
        description: "Authorized reseller of consumer electronics, gaming gear, and smart accessories. Delivering quality since 2018.",
        rating: 4.7,
        joined: "2018",
        email: "support@techworld.lk",
        phone: "+94 77 123 4567",
        address: "No. 218, Galle Road, Colombo 03, Sri Lanka",
        website: "https://www.techworld.lk",
        socialLinks: {
            facebook: "https://facebook.com/techworldlk",
            instagram: "https://instagram.com/techworld.lk",
            twitter: "https://twitter.com/techworldlk"
        },
        productsCount: 128,
        verified: true
    };

  
    return (
    <div className="w-full bg-gray-50 py-10 px-4 md:px-12 lg:px-20">
      {/* Top Section: Image + Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white p-8 rounded-2xl shadow-md">
        {/* Product Image + Variation Gallery */}
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[400px] object-cover rounded-xl"
          />

          {product.variations?.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-4">
              {product.variations.map((v, idx) => (
                <img
                  key={idx}
                  src={v.image}
                  alt={`variation-${idx}`}
                  className="w-20 h-20 object-cover rounded-md border hover:border-black transition"
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-sm text-gray-500 mt-2">{product.description}</p>

          <div className="mt-4 text-2xl text-green-600 font-bold">Rs.{product.price.toLocaleString()}</div>
          <div className="text-yellow-500 mt-1 text-sm">⭐ {product.rating.toFixed(1)} / 5</div>

          <div className="mt-3 text-gray-600 text-sm">
            <strong>Brand:</strong> {product.brand} | <strong>Category:</strong> {product.category}
          </div>

          {/* Variations */}
          {product.variations?.length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium mb-2">Available Variations:</h4>
              <div className="flex flex-wrap gap-2">
                {product.variations.map((variation, i) => (
                  <div
                    key={i}
                    className="border rounded-md px-3 py-1 bg-gray-100 hover:bg-gray-200 text-sm"
                  >
                    {variation.size} / {variation.color} – Rs.{variation.price}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stock & Vendor Info */}
          <div className="mt-6 text-sm text-gray-700">
            {product.stockQuantity > 0 ? (
              <span className="text-green-600 font-semibold">{product.stockQuantity} in stock</span>
            ) : (
              <span className="text-red-600 font-semibold">Out of stock</span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4 flex-wrap">
            <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition">
              Add to Cart
            </button>
            <button className="px-6 py-2 border border-black rounded-lg hover:bg-gray-100">
              Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Vendor Details Section */}
      <div className="bg-white mt-10 p-6 rounded-2xl shadow-md">
        <h2 className="text-xl font-bold mb-4">Sold by Vendor</h2>
        <div className="flex items-center gap-6">
          <img
            src={vendor.logo}
            alt={vendor.name}
            className="w-20 h-20 object-cover rounded-full border"
          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{vendor.name}</h3>
            <p className="text-sm text-gray-500">{vendor.description}</p>
            <div className="text-sm text-gray-600 mt-1">
              Rating: ⭐ {vendor.rating} | Since: {vendor.joined}
            </div>
            <div className="text-sm text-green-600 mt-1">Verified Seller</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;