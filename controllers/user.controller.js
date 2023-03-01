const User = require('../models/User');

const getAllUsers = async (req, res) => {
  console.log(User);
  try {
    const users = await User.findAll();
    res.status(200).send({ status: 200, success: true, data: users });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getAllUsers };
