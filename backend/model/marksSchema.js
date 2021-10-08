const mongoose = require('mongoose');
const Student = require('./studentSchema');
const Subject = require('./subjectSchema');


const marksSchema = new mongoose.Schema({
    student : {type: mongoose.Schema.Types.ObjectId, ref: Student},// unique: true,},
    marks: {type: Number},
    subject :{type: mongoose.Schema.Types.ObjectId, ref: Subject},
    year: {type: Number}
})

const studentMarks = mongoose.model('Marks',marksSchema);

module.exports = studentMarks;

