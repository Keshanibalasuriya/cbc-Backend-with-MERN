import mongoose from "mongoose";

//structure of student document
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    grade: String
});

//model creation
const Student = mongoose.model('Students', studentSchema);

export default Student;
