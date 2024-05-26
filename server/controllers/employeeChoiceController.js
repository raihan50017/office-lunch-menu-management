const pool = require("../db/db");

const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const addEmployeeChoiceController = async (req, res, next) => {
  try {
    const { menu_id } = req.body;
    const currentDate = getCurrentDate();
    const emp_id = req.id;

    // Check if the employee has already chosen a menu item for today
    const checkExistingChoiceQuery =
      "SELECT * FROM employeechoices WHERE emp_id = $1 AND date = $2";
    const existingChoiceResult = await pool.query(checkExistingChoiceQuery, [
      emp_id,
      currentDate,
    ]);

    if (existingChoiceResult.rows.length > 0) {
      // If employee has already chosen a menu item for today, update the existing record
      const updateEmployeeChoiceQuery =
        "UPDATE employeechoices SET menu_id = $1 WHERE emp_id = $2 AND date = $3 RETURNING *";
      const updatedEmployeeChoiceResult = await pool.query(
        updateEmployeeChoiceQuery,
        [menu_id, emp_id, currentDate]
      );

      const updatedEmployeeChoice = updatedEmployeeChoiceResult.rows[0];

      res.status(200).json({
        data: updatedEmployeeChoice,
        message: "Employee choice updated successfully",
      });
    } else {
      // If employee hasn't chosen a menu item for today, insert a new record
      const insertEmployeeChoiceQuery =
        "INSERT INTO employeechoices (emp_id, menu_id, date) VALUES ($1, $2, $3) RETURNING *";
      const insertedEmployeeChoiceResult = await pool.query(
        insertEmployeeChoiceQuery,
        [emp_id, menu_id, currentDate]
      );

      const newEmployeeChoice = insertedEmployeeChoiceResult.rows[0];

      res.status(200).json({
        data: newEmployeeChoice,
        message: "Employee choice added successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

const getEmployeeChoicesByCurrentDateController = async (req, res, next) => {
  try {
    // Get the current date
    const currentDate = getCurrentDate();
    const emp_id = req.id;
    const getEmployeeChoicesQuery = `
    SELECT ec.*, e.first_name, e.last_name, mo.option_name
    FROM employeechoices ec
    JOIN employees e ON ec.emp_id = e.emp_id
    JOIN menuoptions mo ON ec.menu_id = mo.menu_id
    WHERE ec.emp_id = $1 AND ec.date = $2
  `;
    const employeeChoicesResult = await pool.query(getEmployeeChoicesQuery, [
      emp_id,
      currentDate,
    ]);
    const employeeChoices = employeeChoicesResult.rows;

    res.status(200).json({
      data: employeeChoices,
      message: "Retrieved  employee choices for the current date successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getAllEmployeeChoicesByCurrentDateController = async (req, res, next) => {
  try {
    // Get the current date
    const currentDate = getCurrentDate();

    // Retrieve all employee choices for the current date
    const getAllEmployeeChoicesQuery = `
    SELECT ec.*, e.first_name, e.last_name, mo.option_name
    FROM employeechoices ec
    JOIN employees e ON ec.emp_id = e.emp_id
    JOIN menuoptions mo ON ec.menu_id = mo.menu_id
    WHERE ec.date = $1
  `;
    const employeeChoicesResult = await pool.query(getAllEmployeeChoicesQuery, [
      currentDate,
    ]);
    const employeeChoices = employeeChoicesResult.rows;

    res.status(200).json({
      data: employeeChoices,
      message:
        "Retrieved all employee choices for the current date successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addEmployeeChoiceController,
  getAllEmployeeChoicesByCurrentDateController,
  getEmployeeChoicesByCurrentDateController,
};
