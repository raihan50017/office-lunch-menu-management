const adminRouter = require("./adminRouter");
const menuOptionRouter = require("./menuOptionRouter");

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
];

const configureRoutes = (app) => {
  routes.forEach((route) => {
    app.use(route.path, route.router);
  });
};

module.exports = configureRoutes;
