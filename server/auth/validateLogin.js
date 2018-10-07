const Validator = require("validator");
const isEmpty = require("./isEmpty");

// Validate user input in Login
module.exports = function validateLogin(user) {
  let errors = {};

  user.email = !isEmpty(user.email) ? user.email : "";
  user.password = !isEmpty(user.password) ? user.password : "";

  if (!Validator.isEmail(user.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(user.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(user.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
