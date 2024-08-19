import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    count : {
        type: Number,
        default : 0
    },
    

},)

const Counter = mongoose.model('counter', userSchema);

export default User;
