const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const connectDB = require('./config/db.js')
const authRoutes = require('./routes/auth.route.js')
const postRoutes = require('./routes/post.routes.js')
const path = require("path");
const morgan = require('morgan');
const { log, error } = require('console');

dotenv.config() // LOAD .env variable first
connectDB() // connect to mongoDB

const app = express()

app.use(cors()) // Allow cors-origin requests
app.use(express.json()) // Parse incoming JSON bodies
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(morgan('dev'))




app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

app.use('/api/auth',authRoutes)
app.use('/api/posts',postRoutes)

app.get('/', (req, res)=>{
    res.send('Blog API is running...')
})

app.use((req, res)=>{
    res.status(404).json({message:"Route not found"})
})

app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).json({
        message:error.message || "Internal server error"
    })
    
})

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
    
})

