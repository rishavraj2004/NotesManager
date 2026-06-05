require("dotenv").config();
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const app = express();
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI).then(() => {
    console.log("DB CONNECTED SUCESSFULLY");
}).catch((err) => {
    console.log("FAILED TO CONNECT DB", err);
})

app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use('/', authRoutes);


app.get("/", (req, res) => {
    res.render('landing');
});

module.exports = app;