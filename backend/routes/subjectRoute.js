const express = require('express');
const router = express.Router();
const subjectsData = require('../model/subjectSchema')

router.get('/subjects', (req, res) => {
    subjectsData.find({}).then(subjects => {
        // console.log("subjectsRoute", subjects)
        res.status(200).send(subjects)
    }).catch(err => {
        res.status(500).send({message: err.message || "there is an error"})
    })
});

module.exports = router

