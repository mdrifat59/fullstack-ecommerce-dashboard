let User = require ("../model/userSchema")
const bcrypt = require('bcrypt');
let loginController = async (req,res)=>{

    let {email, password}= req.body 
    let existingUser = await User.find({email}) 
    if(existingUser.length == 0){
        res.send({error:"user not found"})
    }else{
        bcrypt.compare(password, existingUser[0].password, function(err, result) { 
            if(result){
                res.send({success:"Login successful"})
            }else{
                res.send({error:"Credencial  is not valid"})
            }
        });
    }
}

module.exports = loginController