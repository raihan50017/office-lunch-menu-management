const { body } = require("express-validator");

// Middleware for user input validation
const menuOptionvalidation = [
  body("date").notEmpty().withMessage("Date name is required"),
  body("option_name").notEmpty().withMessage("Name is required"),
];

module.exports = menuOptionvalidation;
