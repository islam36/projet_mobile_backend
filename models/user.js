const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { EMAIL_REGEX, PHONR_REGEX } = require("../util/constants");

const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "this email is already"],
    match: EMAIL_REGEX,
  },
  phone: {
    type: String,
    required: [true, "phone number is required"],
    unique: [true, "phone number must be unique"],
    match: PHONR_REGEX,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  address: {
    type: String,
  },
  photo: {
    type: String,
    default: ''
  }
}, {
    timestamps: true,
});


userSchema.pre("save", function() {
    this.password = bcrypt.hashSync(this.password, SALT_ROUNDS);
});

module.exports = mongoose.model('user', userSchema);