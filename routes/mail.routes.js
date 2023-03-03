const express = require('express');
const toAllUsers = require('../controllers/mail.controller');

const mailRouter = express.Router();

mailRouter.post('/sendmail', toAllUsers);

module.exports = mailRouter;
