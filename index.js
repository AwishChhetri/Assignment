import express from "express";
import mongoose from "mongoose";
import authRoutes from "./Routes/auth.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';
import ejs from "ejs";
const app=express();
const PORT=3000;
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/uploads', express.static('../uploads'));
app.use(express.static('public'));
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  });

//Mongodb connection
mongoose.connect('mongodb://127.0.0.1:27017/Students',{useNewUrlParser:true}).then((res)=>{
    console.log("Hence db is connected");
}).catch((err)=>{
    console.log(err)
})

//Routs
app.get("/",(req,res)=>{
    res.render("home");
})
app.use("/",authRoutes);





app.listen(PORT,function(){
    console.log(`Server is runnning at http://127.0.0.1:${PORT}/`)
}
)