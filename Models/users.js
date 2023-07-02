import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },

    // dob:{
    //     type:Number,
    //     required:true,
    // },

    Image:{
        type:String,
        required:true,

    },

    email:{
        type:String,
        required:true,
    },

    password:{
        type:String,
        required:true,
    }
});

const user=mongoose.model("User",UserSchema)


export default user;