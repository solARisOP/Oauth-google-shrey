import mongoose from "mongoose";

const connectToMongoDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connected to monogoDb")
    }
    catch(error){
        console.log('error connecting to mongoDb', error)
    }
}

export default connectToMongoDB;