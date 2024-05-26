const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../db/db");

const adminLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if employee exists
    const getAdminQuery = "SELECT * FROM admins WHERE email = $1";
    const adminResult = await pool.query(getAdminQuery, [email]);
    const admin = adminResult.rows[0];

    if (!admin) {
      return res.status(401).json({
        errors: {
          message: "Invalid email or password",
        },
      });
    }

    // Compare passwords using bcrypt
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        errors: {
          message: "Invalid email or password",
        },
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin?.admin_id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    const adminWithoutPassword = {
      ...admin,
      password: undefined,
    };

    res.status(200).json({
      data: adminWithoutPassword,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error logging in employee:", error);
    res.status(500).json({ errors: { message: "Internal server error" } });
  }
};

module.exports = { adminLoginController };
