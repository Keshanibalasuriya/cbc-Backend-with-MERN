import User from "../models/user.js";
import bcrypt from  "bcrypt";


export function getUsers(req, res) {

    //password hashing
    const newUserData=req.body;
    newUserData.password=bcrypt.hashSync(newUserData.password,10);
    console.log("Hashed Password:",newUserData.password);


    //creating a new user
    const user = new User(req.body);
    user.save()
        .then(() => res.json({ message: 'User created successfully!' }))
        .catch(err => res.status(400).json({ error: err.message }));
}

