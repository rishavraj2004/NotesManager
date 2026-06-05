require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI).then(() => {
    console.log("DB CONNECTED SUCESSFULLY");
}).catch((err) => {
    console.log("FAILED TO CONNECT DB", err);
})

app.use(express.urlencoded({ extended: true }));

module.exports = app;