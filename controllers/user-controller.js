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
        res.status(500).send({message: "Something went wrong..!!", data: false, err: err});
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
                res.status(200).send({message: "Success", data: useremail});
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
        res.status(500).send({message: "Something went wrong..!!", data: false, err: err});
    }
}

exports.addStudent = async (req, res) => {
    try {
        const student = new AddStudent({
            name: req.body.name,
            dob: req.body.dob,
            school: req.body.school,
            class: req.body.class,
            division: req.body.division,
            status: req.body.status,
        });
        await student.save();
        res.status(200).send({message: "Success", data: true});
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: "Something went wrong..!!", data: false, err: err});
    }
}

exports.getStudents = async (req, res) => {
    try {
        const students = await AddStudent.find();
        res.status(200).send({message: "Success", data: students});
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: "Something went wrong..!!", data: false, err: err});
    }
}

exports.deleteStudent = async (req, res) => {
    try {
        const id = req.body.id;
        await AddStudent.findByIdAndDelete(id);
        res.status(200).send({message: "Success", data: true});
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: "Something went wrong..!!", data: false, err: err});
    }
}

exports.updateStudent = async (req, res) => {
    try{
        const id = req.body.id;
        const student = await AddStudent.findById(id);
        student.name = req.body.name;
        student.dob = req.body.dob;
        student.school = req.body.school;
        student.class = req.body.class;
        student.division = req.body.division;
        student.status = req.body.status;
        await student.save();
        res.status(200).send({message: "Success", data: true});
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: "Something went wrong..!!", data: false, err: err});
    }
}