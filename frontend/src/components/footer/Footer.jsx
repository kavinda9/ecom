import { assetsFooter } from "../../assets/footer/assetsFooter";

function Footer() {
    return (
    <footer className="bg-white border-t pt-10 pb-6 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

          {/* 1. Brand & Contact */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold">KADE.LK - 1ST SL ONLINE MARKET</h2>
            <p className="text-sm">HOTLINE 24/7</p>
            <p className="text-green-600 text-xl font-bold">(011) 2922 997</p>
            <p className="text-sm">257 Temple Road, Nugegoda, Sri Lanka</p>
            <p className="text-sm">contact@kade.lk</p>

            {/* Social Icons */}
            <div className="flex space-x-3 mt-2">
                <img src={assetsFooter.facebook} alt="Facebook" className="w-5 h-5 hover:opacity-70 cursor-pointer" />
                <img src={assetsFooter.twitter} alt="Twitter" className="w-5 h-5 hover:opacity-70 cursor-pointer" />
                <img src={assetsFooter.instergram} alt="Instagram" className="w-5 h-5 hover:opacity-70 cursor-pointer" />
                <img src={assetsFooter.youtube} alt="YouTube" className="w-5 h-5 hover:opacity-70 cursor-pointer" />
                <img src={assetsFooter.pinterest} alt="Pinterest" className="w-5 h-5 hover:opacity-70 cursor-pointer" />
            </div>

            {/* Language Selectors */}
            <div className="flex items-center space-x-4 mt-4">
              <select className="border border-gray-300 px-2 py-1 rounded-md text-sm">
                <option>SL</option>
              </select>
              <select className="border border-gray-300 px-2 py-1 rounded-md text-sm">
                <option>Eng</option>
              </select>
            </div>
          </div>

          {/* 2. Top Categories */}
          <div>
            <h3 className="font-bold mb-2">TOP CATEGORIES</h3>
            <ul className="space-y-1 text-sm">
              <li>Laptops</li>
              <li>PC & Computers</li>
              <li>Shirts</li>
              <li>Tablets</li>
              <li>Sports Item</li>
              <li>Beauty</li>
              <li>Cameras</li>
              <li>Sounds</li>
              <li>Office</li>
            </ul>
          </div>

          {/* 3. Company */}
          <div>
            <h3 className="font-bold mb-2">COMPANY</h3>
            <ul className="space-y-1 text-sm">
              <li>About Kade</li>
              <li>Contact</li>
              <li>Career</li>
              <li>Blog</li>
              <li>Sitemap</li>
              <li>Store Locations</li>
            </ul>
          </div>

          {/* 4. Help Center */}
          <div>
            <h3 className="font-bold mb-2">HELP CENTER</h3>
            <ul className="space-y-1 text-sm">
              <li>Customer Service</li>
              <li>Policy</li>
              <li>Terms & Conditions</li>
              <li>Track Order</li>
              <li>FAQs</li>
              <li>My Account</li>
              <li>Product Support</li>
            </ul>
          </div>

          {/* 5. Partner & Subscribe */}
          <div>
            <h3 className="font-bold mb-2">PARTNER</h3>
            <ul className="space-y-1 text-sm mb-6">
              <li>Become Seller</li>
              <li>Affiliate</li>
              <li>Advertise</li>
              <li>Partnership</li>
            </ul>

            {/* Subscribe */}
            <h3 className="text-sm font-semibold mb-1">
              SUBSCRIBE & GET <span className="text-red-500">10% OFF</span> FOR YOUR FIRST ORDER
            </h3>
            <div className="flex border-b border-gray-300">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-2 py-1 outline-none text-sm"
              />
              <button className="text-green-600 font-bold text-sm px-3">
                SUBSCRIBE
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              By subscribing, you’re accepted the our{" "}
              <span className="underline cursor-pointer">Policy</span>
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 border-t pt-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2025 <span className="font-bold text-gray-800">Kade.lk</span>. All Rights Reserved</p>
          <div className="flex space-x-4 items-center mt-2 sm:mt-0">
            <img src={assetsFooter.paypal} alt="PayPal" className="h-5" />
            <img src={assetsFooter.visa} alt="Visa" className="h-5" />
            <img src={assetsFooter.mastercard} alt="MasterCard" className="h-5" />
            <a href="#" className="ml-4 text-blue-500">Mobile Site</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;