const adminRouter = require("./adminRouter");
const menuOptionRouter = require("./menuOptionRouter");
const employeeRouter = require("./employeeRouter");
const employeeChoiceRouter = require("./employeeChoiceRouter");

// Import other routers here

const routes = [
  {
    path: "/admin",
    router: adminRouter,
  },
  {
    path: "/menu-option",
    router: menuOptionRouter,
  },
  {
    path: "/employee",
    router: employeeRouter,
  },
  {
    path: "/employee-choice",
    router: employeeChoiceRouter,
  },
];

const configureRoutes = (app) => {
  routes.forEach((route) => {
    app.use(route.path, route.router);
  });
};

module.exports = configureRoutes;
