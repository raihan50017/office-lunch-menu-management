const express = require("express");
const employeeValidation = require("../middleware/validation/employeeValidation");
const {
  employeeRegisterErrorHandler,
} = require("../middleware/errorHandler/employeeErrorHandler");

const {
  employeeRegisterController,
  employeeLoginController,
} = require("../controllers/employeeControllers");

const router = express.Router();

router.post(
  "/register",
  employeeValidation,
  employeeRegisterErrorHandler,
  employeeRegisterController
);

router.post("/login", employeeLoginController);

module.exports = router;
