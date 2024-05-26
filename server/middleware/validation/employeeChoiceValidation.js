const { body } = require("express-validator");

// Middleware for user input validation
const employeeChoiceValidation = [
  body("menu_id")
    .notEmpty()
    .withMessage("Menu ID is required")
    .isInt()
    .withMessage("Menu ID must be an integer"),
];

module.exports = employeeChoiceValidation;
