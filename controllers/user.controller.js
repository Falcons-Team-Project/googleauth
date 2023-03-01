const db = require('../models/index');
const User = db['User'];
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send({ status: 200, success: true, data: users });
  } catch (error) {
    res.status(500).send({
      status: 500,
      success: false,
      message: 'Failed to get all users',
      error: error.message,
    });
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
    res.status(500).send({
      status: 500,
      success: false,
      message: 'Failed to get a user',
      error: error.message,
    });
  }
};

const createNewUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const pwd = await bcrypt.hash(req.body.password, salt);
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: pwd,
    });
    res.status(200).send({ status: 200, success: true, data: newUser });
  } catch (error) {
    res.status(500).send({
      status: 500,
      success: false,
      message: 'Failed to create a user',
      error: error.errors[0].message,
    });
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
    res.status(500).send({
      status: 500,
      success: false,
      message: 'Failed to delete',
      error: error.message,
    });
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
    res.status(500).send({
      status: 500,
      success: false,
      message: 'Failed to Login',
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  deleteUser,
  getUserById,
  loginUser,
};
