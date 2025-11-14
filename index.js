import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';


const app = express();
const PORT = 3000;      

const mongoDB_url='mongodb+srv://admin:1234@cluster0.5tomp5w.mongodb.net/?appName=Cluster0';

mongoose.connect(mongoDB_url);
const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});




app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log('Request received at /');
    res.send("Hello");
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});