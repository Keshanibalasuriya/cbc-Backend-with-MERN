import express from 'express';
import { deleteStudent,getStudents, createStudent } from '../controllers/studentController.js';   


//create router studentRouter
const studentRouter = express.Router();

studentRouter.get("/", getStudents);
studentRouter.post("/", createStudent);
studentRouter.delete ("/",deleteStudent);


export default studentRouter;