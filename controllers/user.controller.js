const db = require('../models/index');
const User = db['User'];
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
  console.log(User);
  try {
    const users = await User.findAll();
    res.status(200).send({ status: 200, success: true, data: users });
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json({
        status: 200,
        success: true,
        data: user,
      });
    } else {
      res
        .status(400)
        .json({ status: 400, success: false, message: "User doesn't exist!" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, success: false, message: error.message });
  }
};

const createNewUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const pwd = await bcrypt.hash(req.body.password, salt);
    const newUser = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: pwd,
    });
    res.status(200).send({ status: 200, success: true, data: newUser });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await User.destroy({ where: { id: req.params.id } });
    if (result === 1) {
      res.status(201).json({
        status: 201,
        success: true,
        message: 'User deleted successfully',
      });
    } else {
      res
        .status(400)
        .json({ status: 400, success: false, message: "User doesn't exist!" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (user && (await user.checkPassword(password))) {
      res.status(200).json({
        status: 200,
        success: true,
        data: user,
      });
    } else {
      res.status(400).json({
        status: 400,
        success: false,
        message: 'Invalid email or password',
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ status: 400, success: false, message: error.message });
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  deleteUser,
  getUserById,
  loginUser,
};
