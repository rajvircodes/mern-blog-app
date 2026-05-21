# 📝 MERN Blog App

A full-stack blog application built with the MERN stack (MongoDB, Express, React, Node.js). Features user authentication, protected routes, image uploads, and full CRUD functionality for blog posts.

---

## 🚀 Features

- 🔐 User registration & login with JWT authentication
- 🍪 Persistent auth state via localStorage
- 📝 Create, read, update, and delete blog posts
- 🖼️ Cover image upload per post
- 🔒 Protected routes (frontend + backend)
- 👤 Owner-only edit & delete controls
- 📱 Responsive layout
- 🔔 Toast notifications for all actions
- 🚫 404 page for unknown routes

---

## 🛠️ Tech Stack

### Backend
| Tech | Purpose |
|------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | NoSQL database |
| Mongoose | ODM for MongoDB |
| JSON Web Token | Authentication |
| bcryptjs | Password hashing |
| Multer | Image file uploads |
| dotenv | Environment variables |
| CORS | Cross-origin requests |

### Frontend
| Tech | Purpose |
|------|---------|
| React (Vite) | UI framework |
| React Router v6 | Client-side routing |
| Axios | HTTP requests |
| Context API | Global auth state |
| react-hot-toast | Notifications |

---

## 📁 Project Structure

```
mern-blog/
├── client/                   # React frontend
│   └── src/
│       ├── api/              # Axios instance
│       ├── components/       # Navbar, PostCard, ProtectedRoute
│       ├── context/          # AuthContext
│       └── pages/            # All page components
│
├── server/                   # Node/Express backend
│   └── src/
│       ├── config/           # MongoDB connection
│       ├── controllers/      # Route logic
│       ├── middleware/        # Auth & upload middleware
│       ├── models/           # Mongoose schemas
│       ├── routes/           # API routes
│       └── uploads/          # Stored images
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### 1. Clone the repository
```bash
git clone https://github.com/your-username/mern-blog.git
cd mern-blog
```

### 2. Setup Backend
```bash
cd server
npm install
```

Create a `.env` file inside `server/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd ../client
npm install
npm run dev
```

### 4. Open the app
```
Frontend → http://localhost:5173
Backend  → http://localhost:5000
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login user |

### Posts
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/posts` | Public | Get all posts |
| GET | `/api/posts/:id` | Public | Get single post |
| POST | `/api/posts` | Protected | Create post |
| PUT | `/api/posts/:id` | Protected + Owner | Update post |
| DELETE | `/api/posts/:id` | Protected + Owner | Delete post |

---

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |

---

## 📸 Screenshots

> _Add screenshots of your app here_

---

## 🧠 What I Learned

- Full-stack MERN project architecture
- REST API design with Express
- JWT-based authentication flow
- Password hashing with bcryptjs
- File uploads with Multer
- React Context API for global state
- Protected & guest routes in React Router v6
- Connecting frontend to backend with Axios interceptors
- Real-world folder structure and clean code practices

---

## 📌 Future Improvements

- [ ] Rich text editor for post content
- [ ] Comment system
- [ ] Pagination / infinite scroll
- [ ] User profile page
- [ ] Search and filter by category
- [ ] Deploy to Render + Vercel

---

## 👨‍💻 Author

Built with 💙 while learning the MERN stack.