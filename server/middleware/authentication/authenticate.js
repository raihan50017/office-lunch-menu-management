const jwt = require("jsonwebtoken");
const pool = require("../../db/db");

const authenticate = (role) => async (req, res, next) => {
  try {
    // Extract JWT token from request headers
    const token = req.header("Authorization");

    // Check if token is present
    if (!token) {
      return res.status(401).json({
        errors: {
          message: "Access denied. No token provided",
        },
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded?.id;
    req.role = role;

    // Proceed to role verification
    await verifyRole(req, res, next);
  } catch (error) {
    res.status(401).json({
      errors: {
        message: "Invalid token",
      },
    });
  }
};

const verifyRole = async (req, res, next) => {
  try {
    if (req?.role === "admin") {
      await verifyAdmin(req, res, next);
    } else if (req?.role === "employee") {
      await verifyEmployee(req, res, next);
    } else {
      return res.status(400).json({
        errors: {
          message: "Invalid role",
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    // Check if the admin exists
    const existingAdminQuery = "SELECT * FROM admins WHERE admin_id = $1";
    const existingAdminResult = await pool.query(existingAdminQuery, [req.id]);
    if (existingAdminResult.rows.length === 0) {
      return res.status(400).json({
        errors: {
          message: "Access denied. No Valid token provided",
        },
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};

const verifyEmployee = async (req, res, next) => {
  try {
    // Check if the employee exists
    const existingEmployeeQuery = "SELECT * FROM employees WHERE emp_id = $1";
    const existingEmployeeResult = await pool.query(existingEmployeeQuery, [
      req.id,
    ]);
    console.log(existingEmployeeResult.rows.length);
    if (existingEmployeeResult.rows.length === 0) {
      return res.status(400).json({
        errors: {
          message: "Access denied. No Valid token provided",
        },
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      errors: {
        message: "Internal server error",
      },
    });
  }
};

module.exports = authenticate;
