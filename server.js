import express from 'express';
import router from './routes/userRoute.js';
import connectToMongoDB from './db/connectToMongo.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from "cors"
dotenv.config();

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors({
    origin: 'http://localhost:3000', // Allows all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specifies allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specifies allowed headers
    credentials: true, // If you want to allow credentials (cookies, etc.)
  }));
app.use(express.json());
app.use(cookieParser())

app.get('/',(req,res)=>{
    return res.send('Hi everone')
})

app.use('/api', router)

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server running on port ${PORT}`)
})




