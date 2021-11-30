/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');
const validator = require('validator');
const config = require('config');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, config.get('messageErrorRequired')],
  },
  email: {
    type: String,
    required: [true, config.get('messageErrorRequired')],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: config.get('messageErrorEmail'),
    },
  },
  password: {
    type: String,
    required: [true, config.get('messageErrorRequired')],
    minlength: 6,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = async function (email, password, next) {
  try {
    const user = await this.findOne({ email }).select('+password');
    if (!user) {
      return Promise.reject(createError.Unauthorized(config.get('messageErrorEmailPassword')));
    }
    try {
      const matched = await bcrypt.compare(password, user.password);
      if (!matched) {
        return Promise.reject(createError.Unauthorized(config.get('messageErrorEmailPassword')));
      }
      return user;
    } catch (err) {
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
};
userSchema.statics.findUserByCheck = async function (req, _id, next) {
  if (!req.body.password && !req.body.email && !req.body.name) {
    return Promise.reject(createError.NotFound(config.get('messageNotUpdate')));
  }
  try {
    let data = {};
    const { name, email, password } = await this.findById(_id).select('+password');
    if (!req.body.password) {
      data.password = password;
    } else {
      data = { ...data, password: await bcrypt.hash(req.body.password, 10) };
    }
    if (!req.body.email) {
      data.email = email;
    } else {
      data.email = req.body.email;
    }
    if (!req.body.name) {
      data.name = name;
    } else {
      data.name = req.body.name;
    }
    return data;
  } catch (err) {
    return next(err);
  }
};

module.exports = mongoose.model('user', userSchema);
