const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const configureRoutes = require("./routers");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

configureRoutes(app);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
