import { response } from "express";
import jwt from "jsonwebtoken";
import user from "../Models/users.js"
const secretKey="HelloHowAreYouDoing";

export const checktoken=(req,res,next)=>{
    const token=req.cookies.__token;
    if(!token){
        res.redirect('/login')
    }
    jwt.verify(token, secretKey,async(err,decoded)=>{
        if(err) throw err;
        if(decoded.id){
            await user.findOne({
                _id:decoded.id
            }).then((response)=>{
                req.user=response;
                next()
            }).catch((errs)=>{
                console.log(errs)
            })
        }
        else{
            res.send("Invalid Signature");
            return redirect("/login")
        }
    })
}


