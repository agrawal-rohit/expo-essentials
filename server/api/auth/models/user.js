const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: 
          { 
            type: String, 
            required: true 
          },
  lastName: 
          { 
            type: String 
          },
  email: 
        { 
          type: String,
          unique: true,
          required: true 
        },
  userName: 
          { 
            type: String,
            unique: true, 
            required: true
          },
  password: 
          { 
            type: String, 
            required: true 
          },
  profileImage:
        {
          type: String, 
        },
  isAdmin: 
        {
          type: Boolean,
          default: false
        },
  createdAt:
        {
          type: Date,
          default: Date.now
        },
  updatedAt:
        {
          type: Date,
          default: Date.now
          },
  lastLogin: 
        {
          type: Date,
          default: Date.now
        },
  signInCount:
        {
          type: Number,
          default: 1
        }
});


userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
      user: {
        _id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
      },
    },
    process.env.JWT_PRIVATE_KEY
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    email: Joi.string().email().required(),
    userName: Joi.string(),
    password: Joi.string()
      .min(4)
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
    isAdmin: Joi.boolean(),
  });

  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
