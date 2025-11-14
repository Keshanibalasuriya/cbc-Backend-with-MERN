import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import Student from './models/student.js';
import studentRouter from './routes/studentRouter.js';

const app = express();
const PORT = 3000;

const mongoDB_url = 'mongodb+srv://admin:1234@cluster0.5tomp5w.mongodb.net/?appName=Cluster0';

// MongoDB Connection
mongoose.connect(mongoDB_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB database connection established successfully'))
.catch(err => console.log("MongoDB error:", err));

app.use(bodyParser.json());

app.use('/students', studentRouter);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
