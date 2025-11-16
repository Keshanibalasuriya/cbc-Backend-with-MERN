import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import studentRouter from './routes/studentRouter.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import auth from './middlewares/auth.js';

const app = express();
const PORT = 3000;

const mongoDB_url = 'mongodb+srv://admin:1234@cluster0.5tomp5w.mongodb.net/?appName=Cluster0';

// MongoDB Connection
mongoose.connect(mongoDB_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log("MongoDB error:", err));

// middlewares
app.use(bodyParser.json());
app.use(auth);


// // JWT Middleware
// app.use((req, res, next) => {

//     // Allow public routes
//     if (req.path === "/users/login" || req.path === "/users/register") {
//         return next();
//     }

//     const token = req.header("Authorization")?.replace("Bearer ", "");

//     console.log("Incoming Token:", token);

//     if (!token) {
//         return res.status(401).json({ message: "No token provided" });
//     }

//     jwt.verify(token, "your_jwt_secret_key", (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: "Invalid token" });
//         }
//         else{
//         console.log("Decoded User:", decoded);
//         req.user = decoded; // pass decoded user data to next routes
//         }
//         next();
//     });
// });


// Use Routers
app.use('/students', studentRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

