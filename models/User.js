module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });
  return User;
};
// ,
//     {
//       sequelize,
//       modelName: 'User',
//     },
