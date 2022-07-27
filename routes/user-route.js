const express = require('express')
const Router = express.Router();
const userController = require('../controllers/user-controller');

Router.post('/register', userController.userRegister);
Router.post('/login', userController.userLogin);
Router.post('/add-student', userController.addStudent);
Router.get('/get-student', userController.getStudents);
Router.post('/delete-student', userController.deleteStudent);
Router.post('/update-student', userController.updateStudent);

module.exports = Router;