const db = require('../models/index');
const User = db['User'];

const getAllUsers = async (req, res) => {
  console.log(User);
  try {
    const users = await User.findAll();
    res.status(200).send({ status: 200, success: true, data: users });
  } catch (error) {
    console.log(error);
  }
};

const createNewUser = async (username, email, password) => {
  try {
    const newUser = await User.create({
      username,
      email,
      password,
    });
    console.log('User created successfully:', newUser.toJSON());
    return newUser;
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getAllUsers, createNewUser };
