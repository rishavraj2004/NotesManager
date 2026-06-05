require("dotenv").config();
const app = require('./app');
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("SERVER IS RUNNING ON http://127.0.0.1:3000/")
})
