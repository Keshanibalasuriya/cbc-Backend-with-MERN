import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{type: String,required: true,unique: true},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    isBlocked:{type:Boolean,default:false},
    type:{type:String,default:""},
    profilePicture:{type:String,default:"https://www.freepik.com/free-psd/3d-rendered-user-icon-blue-circle_420191379.htm#fromView=keyword&page=1&position=20&uuid=efbb2635-d2a5-4f70-bfb6-5e7695a0d7eb&query=Profile"}  
});


const User = mongoose.model('Users', userSchema);

export default User;