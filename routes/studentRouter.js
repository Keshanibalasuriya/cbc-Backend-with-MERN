import express from 'express';

//create router studentRouter
const studentRouter = express.Router();



studentRouter.get("/", (req, res) => {
    console.log('GET request received at /students');   

    res.json({ message: 'students route working!' });
});


studentRouter.post("/", (req, res) => {
    console.log('POST request received at /students');

    res.json({ message: 'students route working!' });    
});

export default studentRouter;