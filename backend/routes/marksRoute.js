const express = require('express');
const router = express.Router();
const studentMarksData = require('../model/marksSchema')

//Create Marks

router.post('/marks', (req, res) => {
    console.log("- data inseted");
    const { student, subject, marks, year } = req.body
    console.log(req.body);
    var marksData = {
        student, subject, marks, year
    }
    var marksDoc = new studentMarksData(marksData);

    marksDoc.save((err, doc) => {
       
        if(err){
         return res.status(400).send(err);
        }else {
            console.log("data inserted" , doc)
            res.status(200).json(doc);
        }
})
})


router.get('/marks', (req, res) => {
    studentMarksData.find({}).populate('subject student').then(user => {
        res.status(200).send(user);
    }).catch(err => {
        res.status(500).send({message: err.message || "there is an error"})
    })
})


module.exports =router; 

