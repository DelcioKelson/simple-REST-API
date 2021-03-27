require("dotenv").config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});


const db = mongoose.connection
db.on('error', () => console.error())
db.once('open', ()=> console.log('Connected to Database'))

app.use(express.json());


const coursesRouter = require('./routes/courses')

app.use('/courses', coursesRouter)

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listtening on port ${port}`))