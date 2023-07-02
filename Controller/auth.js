import multer from "multer";
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import user from "../Models/users.js";
const secretKey="HelloHowAreYouDoing";
const app=express();


const storage=multer.diskStorage({
    destination:'C:/Users/user/Node js/CodePen/uploads',
    filename:function(req,file,cd){
        cd(null,Date.now()+'-'+file.originalname);
    }
});

export const uploads=multer({storage:storage, preservePath: true});



export const registration=async(req,res)=>{
    console.log("Here is the data:",req.file)
    // const uploadedFile = req.body;
    
    try{
        
        const newUser=new user({
            Name:req.body.name,
            // dob:req.body.birth,
            Image:req.file.filename,
            email:req.body.email,
            password:req.body.password,
        })
       const result= await newUser.save()
        console.log(result)
        res.redirect("/login")
    }catch(err){
        console.log(err);
    }
}

app.use('/uploads', express.static('C:/Users/user/Node js/CodePen/uploads'));
export const login=async(req,res)=>{
    try{
        const result=await user.findOne({Name:req.body.name})
        if(!result)
            return console.log("User Not found");
        const token=jwt.sign({id:result._id},secretKey, { expiresIn: '1h' })
        res.cookie("__token",token)
        res.redirect("/home");
    }catch(err){
        console.log(err)
    }
    
};


export const logout=(req,res)=>{
    res.clearCookie("__token");
    res.redirect("/login");
}


