import Student from '../models/student.js';

export function createStudents(req, res) {
    const student = new Student(req.body);
    student.save()
        .then(() => {
            res.json({ message: "Student Created" });
        })
        .catch((error) => {
            res.json({
                message: "Error creating student",
                error: error.message
            });
        });
}

/*export function getStudents(req, res) {
    Student.find()
        .then((students) => {
            res.json({
                message: "Students Found",
                students: students
            });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
}
*/

export function deleteStudents(req,res) {
    Student.deleteOne({name : req.body.name})
        .then(() => {
            res.json({ message: "Student deleted successfully" });
        })
        .catch((error) => {
            res.json({ error: error.message });
        });
}

export async function getStudents(req,res) {
    const student = await Student.find()

    try{
        res.json({
            students : student
        })
    }catch(e){
        res.json({
            message: "Error Occured"
        })
    }
}