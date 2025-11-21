import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import orderRouter from './routes/orderRouter.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import auth from './middlewares/auth.js';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();

const app = express();
const PORT = 3000;

const mongoDB_url =process.env.MONGO_DB_URL;

// MongoDB Connection
mongoose.connect(mongoDB_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log("MongoDB error:", err));

// middlewares
app.use(bodyParser.json());
app.use(cors());
//app.use(auth);


// Use Routers

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

