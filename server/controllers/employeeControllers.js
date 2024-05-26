const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../db/db");
const employeeRegisterController = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the employee already exists
    const existingEmployeeQuery = "SELECT * FROM employees WHERE email = $1";
    const existingEmployeeResult = await pool.query(existingEmployeeQuery, [
      email,
    ]);
    if (existingEmployeeResult.rows.length > 0) {
      return res.status(400).json({
        errors: {
          message: "Employee already exists",
        },
      });
    }

    // Insert a new employee with hashed password
    const insertEmployeeQuery =
      "INSERT INTO employees (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *";
    const insertedEmployeeResult = await pool.query(insertEmployeeQuery, [
      firstName,
      lastName,
      email,
      hashedPassword, // Store hashed password in the database
    ]);

    const newEmployee = insertedEmployeeResult.rows[0];

    // Generate JWT token
    const token = jwt.sign({ id: newEmployee.emp_id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    const employeeWithoutPassword = {
      ...newEmployee,
      password: undefined,
    };

    res.status(200).json({
      data: employeeWithoutPassword,
      message: "Registration successful",
      token,
    });
  } catch (error) {
    next(error);
  }
};

const employeeLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if employee exists
    const getEmployeeQuery = "SELECT * FROM employees WHERE email = $1";
    const employeeResult = await pool.query(getEmployeeQuery, [email]);
    const employee = employeeResult.rows[0];

    if (!employee) {
      return res.status(401).json({
        errors: {
          message: "Invalid email or password",
        },
      });
    }

    // Compare passwords using bcrypt
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({
        errors: {
          message: "Invalid email or password",
        },
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: employee.emp_id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    const employeeWithoutPassword = {
      ...employee,
      password: undefined,
    };

    res.status(200).json({
      data: employeeWithoutPassword,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error logging in employee:", error);
    res.status(500).json({ errors: { message: "Internal server error" } });
  }
};

module.exports = { employeeRegisterController, employeeLoginController };
