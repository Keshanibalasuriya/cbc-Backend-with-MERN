import User from "../models/user.js";



export function getUsers(req, res) {

    const user = new User(req.body);
    user.save()
        .then(() => res.json({ message: 'User created successfully!' }))
        .catch(err => res.status(400).json({ error: err.message }));
}