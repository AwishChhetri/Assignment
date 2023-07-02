export const account=(req,res,next)=>{
    console.log("REQUIRE",req.user)
    if(req.user)
    {
        res.render("account",{Photo:req.user.Image,Name:req.user.Name,
        Email:req.user.email,
        Age:req.user.dob,
    });
    }
    else
    {
        res.redirect("/login")
    }
}




