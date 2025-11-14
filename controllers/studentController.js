import Student from '../models/student.js';

export function getStudents(req, res) {
    Student.find()
        .then(studentList => {
            res.json({ list: studentList });
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });
}


export function createStudent(req, res) {
    console.log('POST request received at /students');

    const studentData = req.body;
    const newStudent = new Student(studentData);
    newStudent.save()
        .then(() => res.json({ message: 'Student is  created successfully!' }))
        .catch(err => res.status(400).json({ error: err.message }));
}


export function deleteStudent(req, res) {
    Student.deleteMany({})

        .then(() => res.json({ message: 'All students deleted successfully!' }))
        .catch(err => res.status(400).json({ error: err.message }));
}