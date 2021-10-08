const express = require('express');
const router = express.Router();
const studentData = require('../model/studentSchema')
const Marks = require('../model/marksSchema');

//Create

router.post('/students', (req, res) => {
    console.log("student data inseted");
    var studentDetails = {
        studentName: req.body.studentName,
        rollNo: req.body.rollNo,
        phone: req.body.phone,
    }
    var newDoc = new studentData(studentDetails);
    newDoc.save((err, doc) => {
        if(err){
            return  res.status(400).send(err);
        }else {
            return  res.status(200).json(doc);
} 
    })
})

// Read 

router.get('/students', (req, res) => {
    studentData.find({}).then(user => {
        res.status(200).send(user)
    }).catch(err => {
        res.status(500).send({message: err.message || "there is an error"})
    })
})

// Update Route

router.post('/students/update/:id', (req, res) => {
    console.log("EDITING DOC", req.params.id);
    console.log("res", req.body.studentName, req.body.rollNo, req.body.phone);

    var studentDetails = {
        studentName: req.body.studentName,
        rollNo: req.body.rollNo,
        phone: req.body.phone,
    }

    studentData.findByIdAndUpdate(req.params.id, studentDetails,{new:true}).exec((err, doc) => {
        if(err) {
            return res.status(400).send(err);
        }else {
            res.status(200).json(doc);
        } 
    })
})

//delete

router.delete('/students/delete/:id', (req, res) => {
    const id = req.params.id;
    studentData.findByIdAndDelete(id)
    .then((data, err) => {
        if(err || !data){
            res.status(400).send({message: "Cannot delete user"})
        }else{
            Marks.find({student: id}).deleteOne((marksDeleteErr, count) => {
                if(marksDeleteErr || !count){
                    console.log({error: marksDeleteErr || 'Student Id not found in any Marks documents. Check Student Id and try again'})
                    return;
                }
                console.log('Deleted Marks Documents: ', count);
            });
            res.status(200).send({message: "User Deleted"})
        }
    }).catch(err => {
        res.status(500).send({message:"Error in deleting", err})
    })
})

module.exports =router; 











// router.post('/students', (req, res) => {
//     console.log(req.body);  
    
//         const studentDetails = new studentData({
//             studentName: req.body.studentName,
//             subject: req.body.subject,
//             marks: req.body.marks
//         })
//         studentDetails.save()
//         .then( data => {
//             console.log(data)
//             res.json(data)
//         }).catch((err) =>
//             res.status(500).json({ error: "Failed to register" })
//         );
//     })
