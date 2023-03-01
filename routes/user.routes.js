const express = require('express');
const {
  getAllUsers,
  createNewUser,
} = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.get('/', getAllUsers);
// userRouter.post('/', createNewUser);
 
module.exports = userRouter;
