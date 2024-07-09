const express = require("express")
const _ = express.Router() 
 const registrationController = require ("../../Controllers/registrationController")
const otpController = require("../../Controllers/otpController")
const loginController = require("../../Controllers/loginController")
 

_.post("/registration", registrationController)
_.post("/otpverify", otpController)
_.post("/login", loginController)

 

module.exports = _ ;