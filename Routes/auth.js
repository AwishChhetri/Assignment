import express from "express";
import { logout,login,registration,uploads} from "../Controller/auth.js";
import { checktoken } from "../Midddleware/auth.js";
import { account } from "../Controller/account.js";
const router=express.Router();
// console.log(uploads);
router.post('/register',uploads.single('image'),registration);
router.get("/register",(req,res)=>{
    res.render("register");
})
router.post('/login',login);
router.get("/login",(req,res)=>{
    res.render("login");
});
router.get('/logout',logout);

router.get('/home',checktoken,account);

export default router;
