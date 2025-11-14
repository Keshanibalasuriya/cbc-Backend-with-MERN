import express from 'express';

const app = express();
const PORT = 3000;      

const mongoDB_url='mongodb+srv://admin:1234@cluster0.5tomp5w.mongodb.net/?appName=Cluster0';
;

app.get('/', () => {
  console.log('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});