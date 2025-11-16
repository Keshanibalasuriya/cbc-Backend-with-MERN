import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// Create new user
export function createUser(req, res) {

    const newUserData = req.body;

    // Hash password
    newUserData.password = bcrypt.hashSync(newUserData.password, 10);

    const user = new User(newUserData);

    user.save()
        .then(() => res.json({ message: "User created successfully!" }))
        .catch(err => res.status(400).json({ error: err.message }));
}


// Login user
export function loginUser(req, res) {

    User.findOne({ email: req.body.email })
        .then(user => {

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            // Compare passwords
            const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid password" });
            }

            // Generate token
            const token = jwt.sign(
                {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    isBlocked: user.isBlocked,
                    type: user.type,
                    profilePicture: user.profilePicture
                },
                "your_jwt_secret_key",
            
        );
        console.log("Generated Token:", token);

            // Send token to client
            return res.status(200).json({
                message: "Login successful",
                token: token
            });

        })
        .catch(err => res.status(400).json({ error: err.message }));
}
