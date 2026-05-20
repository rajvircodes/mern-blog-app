# MERN Blog App 🚀

A beginner-friendly **MERN Blog Application Backend** built with **Node.js, Express.js, MongoDB, and JWT Authentication**.

This project focuses on learning real-world backend development concepts including authentication, protected routes, image uploads, and secure API architecture.

> Frontend is currently under development.

---

# 📌 Features

- ✅ User Registration
- ✅ User Login Authentication
- ✅ JWT Token Authentication
- ✅ Protected Routes Middleware
- ✅ Password Hashing using bcrypt
- ✅ Image Upload using Multer
- ✅ MongoDB Database Integration
- ✅ REST API Architecture
- ✅ Environment Variables Support
- ✅ Error Handling Middleware

---

# 🛠️ Tech Stack

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Authentication & Security
- JWT (JSON Web Token)
- bcrypt

## File Upload
- Multer

## Other Packages
- dotenv
- cors
- nodemon

---

# 📂 Project Structure

```bash
server/
│
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   ├── config/
│   └── index.js
│
├── .env
├── package.json
```

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory and add:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# 📦 Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Move into project folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Run the server:

```bash
npm run dev
```

---

# 🚀 API Features

## Authentication Routes
- Register User
- Login User

## Protected Routes
Protected using JWT middleware.

Example:

```http
Authorization: Bearer your_token
```

## Image Upload
Users can upload images using Multer middleware.

---

# 🔐 Authentication Flow

1. User registers with email & password
2. Password gets hashed using bcrypt
3. User logs in
4. JWT token gets generated
5. Token is verified for protected routes

---

# 📸 Image Upload

Images are stored locally using Multer inside:

```bash
src/uploads/
```

---

# 🧠 Learning Goals of This Project

This project helped in understanding:

- REST APIs
- Backend Folder Structure
- Authentication System
- Middleware
- MongoDB CRUD Operations
- File Handling
- Secure Password Storage
- Token-based Authentication

---

# 📈 Future Improvements

- Refresh Tokens
- Role-based Authorization
- Cloudinary Image Upload
- Pagination
- Comments System
- Likes & Bookmarks
- Admin Panel
- Deployment

---

# 🤝 Contributing

Contributions are welcome.

Feel free to fork the project and improve it.

---

# 👨‍💻 Developer

Built with ❤️ by Rajvirsinh