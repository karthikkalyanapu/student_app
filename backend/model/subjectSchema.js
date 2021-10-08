const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  
    name: {type: String}
})

const Subject = mongoose.model('Subjects',subjectSchema);

module.exports = Subject;