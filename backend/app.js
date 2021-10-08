 const dotenv = require('dotenv');
const express =require('express');
const app = express();
const studentRouter = require('./routes/studentRouter');
const marksRouter = require('./routes/marksRoute')
const subjectRouter = require('./routes/subjectRoute')


const cors = require('cors')
const bodyParser = require("body-parser")

dotenv.config({ path: './config/dev.env'})
require('./db/conn');
require('./model/studentSchema')
require('./model/marksSchema')
require('./model/subjectSchema')

//bodyParser


app.use(bodyParser.urlencoded({ extended: true }));



app.use(express.json());
app.use(cors())
app.use('/app', studentRouter)
app.use('/app', marksRouter)
app.use('/app', subjectRouter)



const PORT = process.env.PORT ||  5000;

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
})