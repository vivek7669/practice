require("dotenv").config();
const express = require('express');
const dbConnector = require("./config/db");
const userRoute = require("./router/userrouter");


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended : true}));
// app.use(express.static()); for static path

app.get("/",(req,res)=>{
    res.send("Hello, World!");
});

app.use("/user",userRoute);

app.listen(port , ()=>{
    dbConnector();
    console.log(`Server is running at http://localhost:${port}`);
});