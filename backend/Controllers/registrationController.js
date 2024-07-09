const User = require ("../model/userSchema")
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator')

let registrationController = async (req, res)=>{
    let {name,email,password} = req.body
    let existingUser = await User.find({email:email}) 
    if(existingUser.length == 0){
        if(!name){
            res.send("Name required")
         }else if(!email){
            res.send("Email required")
         }else if (!password){
            res.send("Password required")
         }else{ 

          let otp =  otpGenerator.generate(10, { upperCaseAlphabets: false, specialChars: true });
                bcrypt.hash(password, 10, async function(err, hash) {
                    let user = new User({
                        name: name,
                        email: email,
                        password: hash,
                        otp: otp,
                    })
            
                    user.save()

                 
                   

                    const transporter = nodemailer.createTransport({
                        service:"gmail",
                        auth: {
                          user: "mdrifatulislam59@gmail.com",
                          pass: "dkay yvdn bgmj fuwi",
                        },
                      });

                      const info = await transporter.sendMail({
                        from: process.env.BASE_EMAIL, // sender address
                        to: email, // list of receivers
                        subject: "Varify Your Email", // Subject line 
                        html:  `<div style="display: flex; width: 600px; height: 200px;"> <div style="width:50%; height: 100px;"> Please Verify your email by click this button <a href="https://www.figma.com/">Verify</a>${otp} </div></div>`, // html body
                      });
                    
                    res.send(user)
                }); 
           
         }
    }else{
        res.send("Email already exits")
    }
   
}


module.exports = registrationController