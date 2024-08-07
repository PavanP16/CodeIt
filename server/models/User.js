const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Name is a required field!"],
    unique: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "Email is a required field!"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email address!",
    },
  },
  password: {
    type: String,
    required: [true, "Password is a required field!"],
    validate: {
      validator: validator.isStrongPassword,
      message: "Please provide strong password",
    },
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  passwordToken: {
    type: String,
  },
  passwordTokenExpirationDate: {
    type: Date,
  },
  skills: {
    type: [String],
    default: [],
  },
  score: {
    type: Number,
    default: 0,
  }
});

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);