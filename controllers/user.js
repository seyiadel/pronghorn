const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let saltRounds = 10;

const registerUser = async (req, res) => {
    let {firstName, lastName, email, phoneNumber, password} = req.body

    try{
        const user = await User.findOne({email:email});
        if(user){
            res.status(200).json({
                "status":true,
                "message": "[SUCCESS] - Email already exists"
            });
        }
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if(err){
                console.log(err)
                console.log("[FAILED] - Password Hashing failed")
            }else{
                const user = User.create({
                    "firstName": firstName,
                    "lastName":lastName,
                    "email":email,
                    "phoneNumber":phoneNumber,
                    "password":hash
                });
                res.status(201).json({
                    "status":true,
                    "message":"[SUCCESS]- User Registration Successful",
                    "data":{
                        "firstName":user.firstName,
                        "lastName":user.lastName,
                        "email":user.email,
                        "phoneNumber":phoneNumber
                    }
                });
            };
        });
    }catch(err){
        console.error(err);
        res.status(400).json({
            "status":false,
            "message":"[FAILED]- User Registration Failed",
        });
    }
}


const loginUser = async (req, res) => {
    let {email, password} = req.body;
    try{
        const retrieveUser = await User.findOne({email:email})
        if (!retrieveUser){
            console.error("Credential does not exist, Please Register");
            res.status(404).json({
                "status":false,
                "message":"[NOT FOUND]- User Credentials not found, Please Register",
            });
        }else{
            const confirmPassword = await bcrypt.compare(password, retrieveUser.password);
            if(!confirmPassword){
                console.log("Incorrect Password");
                res.status(400).json({
                    "status":false,
                    "message":"[FAILED]- Incorrect Password, Try Again",
                });
            }
            jwt.sign(retrieveUser, process.env.JWT_SECRET_KEY,(token)=>{
                res.status(200).json({
                    "status":true,
                    "message":"[SUCCESS] -Token Generated, Login Successful",
                    "token": token,
                    "email":retrieveUser.email
                })
            })
        }
    }catch{err}{
        console.log("Something Went Wrong!", err);
        res.status(400).json({
            "status":false,
            "message":"[FAILED]- Incorrect Password, Try Again",
        });
    }
}


module.exports = {registerUser, loginUser};