const express = require('express')
const Router = express.Router();
const userController = require('../controllers/user-controller');

Router.post('/register', userController.userRegister);
Router.post('/login', userController.userLogin);

module.exports = Router;