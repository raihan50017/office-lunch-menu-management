const adminRouter = require("./adminRouter");
const menuOptionRouter = require("./menuOptionRouter");
const employeeRouter = require("./employeeRouter");

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
];

const configureRoutes = (app) => {
  routes.forEach((route) => {
    app.use(route.path, route.router);
  });
};

module.exports = configureRoutes;
