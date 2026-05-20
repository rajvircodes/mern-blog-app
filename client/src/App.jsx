import { AuthProvider } from "./context/AuthContext"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import CreatePost from "./pages/CreatePost"
import PostDetail from "./pages/PostDetail"
import EditPost from "./pages/EditPost"

const App = () => {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
            <Toaster position="top-right"/>
            <Navbar/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/create" element={<CreatePost/>}/>
              <Route path="/post/:id" element={<PostDetail/>}/>
              <Route path="/edit/:id" element={<EditPost/>}/>
            </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App