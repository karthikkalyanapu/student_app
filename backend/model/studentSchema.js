const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
   
    studentName:{
        type: String,
        required:true
    },
    rollNo : {
        type: String,
        required: true,
        // unique: true,
    },
    phone : {
        type: Number,
        required: true
    },
   
})

const Student = mongoose.model('Student',studentSchema);

module.exports = Student;





