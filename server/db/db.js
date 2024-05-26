const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "lunch_menu_management",
  password: "postgres",
  port: 5432,
});

module.exports = pool;
