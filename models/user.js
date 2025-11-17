import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{ type: String, required: true, unique: true },
    firstName:{ type: String, required: true },
    lastName:{ type: String, required: true },
    password:{ type: String, required: true },
    isBlocked:{ type: Boolean, default: false },
    type:{ type: String, default: "" },
    profilePicture:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/149/149071.png"
    }
});

const User = mongoose.model("Users", userSchema);

export default User;
