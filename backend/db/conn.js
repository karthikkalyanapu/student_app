const mongoose = require('mongoose')

console.log("mongodb url", process.env.MONGODB_URL);

mongoose
    .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => {
        console.log("Mongodb Connected Successfully")
    })
    .catch(e => {
        console.error('Mongodb Connection error: ', e, 'errorMessage: ', e.message)
    })

const db = mongoose.connection
    
module.exports = db