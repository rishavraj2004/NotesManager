require("dotenv").config();
const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const app = express();
const session = require('express-session');
const MongoStore = require('connect-mongo').default;


const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI).then(() => {
    console.log("DB CONNECTED SUCESSFULLY");
}).catch((err) => {
    console.log("FAILED TO CONNECT DB", err);
})



app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: MONGODB_URI,
        collectionName: 'sessions'
    })
}));

app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use('/', authRoutes);


app.get("/", (req, res) => {
    res.render('landing');
});

module.exports = app;