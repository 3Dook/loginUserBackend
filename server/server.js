const express = require('express')
const session = require('express-session')
const app = express()
const path = require('path')
const cors = require('cors')
const mongoose = require('mongoose');
// Passport for user Login features
const passport = require('passport')
const LocalStrategy = require('passport-local');
const User = require('./models/user.model')
//sessions

// 
require('dotenv').config()
const PORT = process.env.PORT || 5001;
const URI = process.env.URI || 'mongodb://localhost:27017/blockTest';

//Database
mongoose.connect(URI,
    );
    const connection = mongoose.connection;
    connection.once('open', () => {
      console.log("MongoDB database connection established successfully");
    })

// Sessions and cookie set up
const sessionConfig = {
    secret: 'randomSeriesOfwords',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

// Configurations || middleware
app.use(cors())
app.use(express.json())
app.use(session(sessionConfig))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//routes
app.use('/api', require('./routes/block'));
app.use('/user', require('./routes/user'))
app.use('*', (req, res)=>{
    res.status(200).json("Please use /api backend")
})


app.listen(PORT, ()=>{
    console.log(`server has started on port ${PORT}`)
})