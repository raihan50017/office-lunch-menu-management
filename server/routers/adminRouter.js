const express = require("express");
const { adminLoginController } = require("../controllers/adminControllers");

const router = express.Router();

router.post("/login", adminLoginController);

module.exports = router;
