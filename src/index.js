require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const connectDB= require('./config/db.js');

// ++++++++++++++++...connect Database ...++++++++++++++++++++++++
connectDB()


//++++++++++++++++... Middleware configuration....++++++++++++++++++++
app.use(cors())

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
// Set views directory
// app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");



// ++++++++++++++++...define routes ...++++++++++++++++

app.use('/api/auth', require('./routes/authRoute.js'));
app.use('/api/tutorial', require('./routes/tutorialRoute.js'))

// http://localhost:300/api/user

app.get('/',(req,res)=>{
    res.send('hello world');
});


app.listen(process.env.PORT,() =>{
    console.log(`listening on ${process.env.PORT}`);
})