const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const connectDB = require('../src/config/db.js')

dotenv.config() // LOAD .env variable first
connectDB() // connect to mongoDB

const app = express()

app.use(cors()) // Allow cors-origin requests
app.use(express.json()) // Parse incoming JSON bodies

app.get('/', (req, res)=>{
    res.send('Blog API is running...')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`);
    
})

