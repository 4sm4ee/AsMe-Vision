/*!
=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================
* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React from "react";
import Dashboard from "./views/Dashboard.jsx";
import UserProfile from "./views/UserProfile.jsx";
import TableList from "./views/TableList.jsx";
import "./routes.css";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "fas fa-chart-pie",
    component: <Dashboard />,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "fas fa-user",
    component: <UserProfile />,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    icon: "fas fa-table",
    component: <TableList />,
    layout: "/admin"
  }
];

export default dashboardRoutes;