# 🛒 Multi Vendor Ecommerce Website

This is a full-stack multi-vendor ecommerce web application developed using **React.js**, **Tailwind CSS**, **Node.js**, and **MongoDB**. It allows multiple vendors to register and manage their shops while customers can browse, add to cart, and purchase products easily.

## 🚀 Features

### 🧑‍💻 User Side
- User Registration and Login with JWT authentication
- Browse all shops and products
- View individual shop profiles
- Product filtering by category, brand, rating
- Product detail pages with variation selection (size, color, etc.)
- Add to Cart and Checkout
- View past orders in user profile

### 🛍️ Vendor Side
- Vendor registration and login
- Create and manage shop profile
- Add, edit, and delete products with variations
- View orders from customers

### 🔐 Admin Panel (in progress)
- Manage users, vendors, and products
- View system statistics

## 🛠️ Tech Stack

| Technology     | Role                      |
|----------------|---------------------------|
| React.js       | Frontend UI               |
| Tailwind CSS   | UI Styling                |
| Node.js        | Backend API               |
| Express.js     | Web framework             |
| MongoDB        | Database                  |
| Mongoose       | ODM for MongoDB           |
| JWT            | Authentication            |
| Bcrypt         | Password hashing          |
| Cloudinary     | Image storage (optional)  |

## 📁 Project Structure

/frontend => React frontend
/backend => Node.js + Express backend
/models => Mongoose models
/routes => Express routes
/controllers => Business logic
/utils => Utility functions (e.g., auth)
