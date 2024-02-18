const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const cors=require("cors");
const dotenv=require("dotenv");
dotenv.config()
// //session required for login with google or any other services
const session = require('express-session');

const PORT=process.env.PORT;
const SESSION_SECRET =process.env.SESSION_SECRET
require('./connection/connection');

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.set('view engine','ejs')


app.use(session({
    resave: false,
    saveUninitialized: true,
    secret:SESSION_SECRET
}));

app.use("/",require("./router/user"))


app.listen(PORT,()=>{
    console.log(`App running on localhost:${PORT}`)
})

module.exports=app





