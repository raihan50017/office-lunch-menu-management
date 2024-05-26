const express = require("express");
const menuOptionvalidation = require("../middleware/validation/menuOptionValidation");
const {
  menuOptionAddErrorHandler,
} = require("../middleware/errorHandler/menuOptionErrorHandler");
const {
  addMenuOptionController,
  getAllMenuOptionsController,
  getMenuOptionsByCurrentDateController,
  updateMenuOptionController,
  deleteMenuOptionController,
  getMenuOptionsByDateController,
} = require("../controllers/menuOptionController");
const authenticate = require("../middleware/authentication/authenticate");

const router = express.Router();

router.post(
  "/add",
  authenticate("admin"),
  menuOptionvalidation,
  menuOptionAddErrorHandler,
  addMenuOptionController
);

router.put(
  "/update/:menu_id",
  authenticate("admin"),
  menuOptionvalidation,
  menuOptionAddErrorHandler,
  updateMenuOptionController
);

router.delete(
  "/delete/:menu_id",
  authenticate("admin"),
  deleteMenuOptionController
);

router.get("/fetch-all", getAllMenuOptionsController);

router.get("/fetch-by-date/:date", getMenuOptionsByDateController);

router.get("/fetch-by-current-date", getMenuOptionsByCurrentDateController);

module.exports = router;
