const mongoose = require('mongoose');
const Register = require("../models/register");
const bcrypt = require("bcryptjs");
const AddStudent = require("../models/studentSchema");

exports.userRegister = async (req, res) => {
    try {
        if (req.body.password === req.body.confirmpassword) {
            const useremail = await Register.findOne({ email: req.body.email });
            if(useremail){
                res.status(200).send({message: "User already exist", data: false});    
            }
            else {
                const registerStudent = new Register({
                    email: req.body.email,
                    password: req.body.password,
                    confirmpassword: req.body.confirmpassword,
                });
                await registerStudent.save();
                res.status(200).send({message: "Success", data: true});
            }
        } else {
            res.status(200).send({message: "Password did not match", data: false});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: "Something went wrong..!!", data: err});
    }
}

exports.userLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Register.findOne({ email: email });
        if(useremail){
            const isMatch = await bcrypt.compare(password, useremail.password);
            if (isMatch) {
                res.status(200).send({message: "Success", data: true});
            } else {
                res.status(200).send({message: "Invalid Details", data: false});
            }
        }
        else {
            res.status(200).send({message: "Invalid Details", data: false});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: "Something went wrong..!!", data: err});
    }
}