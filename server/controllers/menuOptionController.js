const pool = require("../db/db");
const { getCurrentDate } = require("./utils");

const addMenuOptionController = async (req, res, next) => {
  try {
    const { date, option_name } = req.body;

    // Insert the new menu option
    const insertMenuOptionQuery =
      "INSERT INTO menuoptions (date, option_name) VALUES ($1, $2) RETURNING *";
    const insertedMenuOptionResult = await pool.query(insertMenuOptionQuery, [
      date,
      option_name,
    ]);

    const newMenuOption = insertedMenuOptionResult.rows[0];

    res.status(200).json({
      data: newMenuOption,
      message: "Menu option added successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getAllMenuOptionsController = async (req, res, next) => {
  try {
    // Retrieve all menu options
    const getAllMenuOptionsQuery = "SELECT * FROM menuoptions";
    const menuOptionsResult = await pool.query(getAllMenuOptionsQuery);
    const menuOptions = menuOptionsResult.rows;

    res.status(200).json({
      data: menuOptions,
      message: "Retrieved all menu options successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getMenuOptionsByCurrentDateController = async (req, res, next) => {
  try {
    // Get the current date
    const currentDate = getCurrentDate();

    // Retrieve menu options for the current date
    const getMenuOptionsByCurrentDateQuery =
      "SELECT * FROM menuoptions WHERE date = $1 ORDER BY menu_id DESC";
    const menuOptionsResult = await pool.query(
      getMenuOptionsByCurrentDateQuery,
      [currentDate]
    );
    const menuOptions = menuOptionsResult.rows;

    res.status(200).json({
      data: menuOptions,
      message: "Retrieved menu options for the current date successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateMenuOptionController = async (req, res, next) => {
  try {
    const { date, option_name } = req.body;
    const { menu_id } = req.params;

    // Update the menu option
    const updateMenuOptionQuery =
      "UPDATE menuoptions SET date = $1, option_name = $2 WHERE menu_id = $3 RETURNING *";
    const updatedMenuOptionResult = await pool.query(updateMenuOptionQuery, [
      date,
      option_name,
      menu_id,
    ]);

    const updatedMenuOption = updatedMenuOptionResult.rows[0];

    res.status(200).json({
      data: updatedMenuOption,
      message: "Menu option updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

const deleteMenuOptionController = async (req, res, next) => {
  try {
    const { menu_id } = req.params;

    // Delete the menu option
    const deleteMenuOptionQuery =
      "DELETE FROM menuoptions WHERE menu_id = $1 RETURNING *";
    const deletedMenuOptionResult = await pool.query(deleteMenuOptionQuery, [
      menu_id,
    ]);

    const deletedMenuOption = deletedMenuOptionResult.rows[0];

    res.status(200).json({
      data: deletedMenuOption,
      message: "Menu option deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getMenuOptionsByDateController = async (req, res, next) => {
  try {
    const { date } = req.params;

    // Retrieve menu options for the specified date
    const getMenuOptionsByDateQuery =
      "SELECT * FROM menuoptions WHERE date = $1 ORDER BY menu_id DESC";
    const menuOptionsResult = await pool.query(getMenuOptionsByDateQuery, [
      date,
    ]);
    const menuOptions = menuOptionsResult.rows;

    res.status(200).json({
      data: menuOptions,
      message: `Retrieved menu options for ${date} successfully`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addMenuOptionController,
  getAllMenuOptionsController,
  getMenuOptionsByCurrentDateController,
  updateMenuOptionController,
  deleteMenuOptionController,
  getMenuOptionsByDateController,
};
