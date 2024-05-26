import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/home/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Login from "./pages/login/Login.jsx";
import EmployeeChoiceList from "./pages/employeeChoiceList/EmployeeChoiceList.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="">
      <Route path="" element={<Layout />}>
        <Route index element={<ProtectedRoute element={<Home />} />} />
        <Route
          path="employee-choice-list"
          element={<ProtectedRoute element={<EmployeeChoiceList />} />}
        />
      </Route>
      <Route path="auth">
        <Route path="login" element={<Login></Login>}></Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
