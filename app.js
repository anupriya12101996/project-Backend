const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { env } = require('./env');
const userRoute = require('./routes/user-route');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(env.mongoUrl).then(() => {
    console.log(`Connection Successful..!!`);
}).catch((e) => {
    console.log(`Connection Failed..!!`);
});

app.use('/user/', userRoute);

app.use('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

module.exports = app;