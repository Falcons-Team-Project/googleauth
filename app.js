const express = require('express');
const userRouter = require('./routes/user.routes');
const app = express();

app.use('/user', userRouter);

module.exports = app;
