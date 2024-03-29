const validator = require('validator');

module.exports = (sequelize, dataType) => {
  const user = sequelize.define('user', {
    firstName: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    lastName: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
    },
    email: {
      type: dataType.STRING,
      allowNull: false,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    profileImage : {
      type : dataType.STRING,
      allowNull : true,
      minlength : 15
    },
    phoneNumber : {
      type : dataType.STRING,
      allowNull : true,
      validate(value) {}
    },
    password: {
      type: dataType.STRING,
      allowNull: false,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
    },
    gender : {
      type: dataType.ENUM('Male', 'Female')
    },
    userRole : {
      type : dataType.ENUM('user', 'admin', 'super'),
      defaultValue: 'user'
    },
    isEmailVerified: {
      type: dataType.BOOLEAN,
    },
    isPhoneVerified: {
      type: dataType.BOOLEAN,
    },
    lastLogin : dataType.DATE,
  });

  return user;
};
