const express = require('express');
const {
  getAllUsers,
  createNewUser,
  deleteUser,
  getUserById,
  loginUser,
} = require('../controllers/user.controller');
const userRouter = express.Router();

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUserById);
userRouter.post('/', createNewUser);
userRouter.delete('/:id', deleteUser);
userRouter.post('/login', loginUser);

module.exports = userRouter;
