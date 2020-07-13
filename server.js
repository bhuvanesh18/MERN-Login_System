const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const dbConnection = require('./db_connection/dbConnection');

// getting config 
dotenv.config({ path: './config/config.env'});

//connecting DB Connection 
dbConnection();

//app
const app = express();

//body parsing
app.use(express.json());

// routes
app.use('/api/register', require('./routes/registerRoute'));
app.use('/api/login', require('./routes/loginRoute'));
app.use('/api/home', require('./routes/homeRoute'));
app.use('/api/updateprofile', require('./routes/updateProfileRoute'));
app.use('/api/updatepassword', require('./routes/updatePasswordRoute'));


const PORT = process.env.PORT || 5000 ;
// for production
if(process.env.NODE_ENV==='PRODUCTION'){
    app.use(express.static('frontend/build'));

    app.use('*',(req,res) => { 
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    });
}

app.listen(PORT , () => {
    console.log(`Server Started on port ${PORT} running on ${process.env.NODE_ENV} mode`);
});