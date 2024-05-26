const adminRouter = require("./adminRouter");

// Import other routers here

const routes = [
  {
    path: "/admin",
    router: adminRouter,
  },
];

const configureRoutes = (app) => {
  routes.forEach((route) => {
    app.use(route.path, route.router);
  });
};

module.exports = configureRoutes;
