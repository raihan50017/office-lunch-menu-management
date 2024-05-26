const express = require("express");

const router = express.Router();
const {
  addEmployeeChoiceController,
  getAllEmployeeChoicesByCurrentDateController,
  getEmployeeChoicesByCurrentDateController,
} = require("../controllers/employeeChoiceController");
const authenticate = require("../middleware/authentication/authenticate");
const employeeChoiceValidation = require("../middleware/validation/employeeChoiceValidation");
const {
  addEmployeeChoiceErrorHandler,
} = require("../middleware/errorHandler/employeeChoiceErrorHandler");

router.post(
  "/add",
  authenticate("employee"),
  employeeChoiceValidation,
  addEmployeeChoiceErrorHandler,
  addEmployeeChoiceController
);

router.get(
  "/fetch-all-by-current-date",
  getAllEmployeeChoicesByCurrentDateController
);

router.get(
  "/fetch-single-by-current-date",
  authenticate("employee"),
  getEmployeeChoicesByCurrentDateController
);
module.exports = router;
