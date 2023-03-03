const express = require('express');
const mailRouter = require('./routes/mail.routes');
const userRouter = require('./routes/user.routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter);
app.use('/mail', mailRouter);

module.exports = app;
