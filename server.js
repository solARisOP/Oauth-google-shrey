import express from 'express';
import router from './routes/userRoute.js';
import connectToMongoDB from './db/connectToMongo.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

const app = express()
const PORT = process.env.PORT || 8000

dotenv.config();


app.use(express.json());

app.use(cookieParser())
app.get('/',(req,res)=>{
    return res.send('Hi everone')
})

app.use(router)

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server running on port ${PORT}`)
})




