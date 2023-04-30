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
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Upgrade from "views/Upgrade.js";
import Status from "views/Status"
import Role from "views/Role";
import User from "views/User";
import Project from "views/Project";
import TimeEntry from "views/TimeEntry";
import Report from "views/Report";


const dashboardRoutes = [
  {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "nc-icon nc-alien-33",
    component: Upgrade,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user/profile",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/table",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-paper-2",
    component: Typography,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/project",
    name: "Project",
    icon: "nc-icon nc-tablet-2",
    component: Project,
    layout: "/admin"
  },
  {
    path: "/timeEntry",
    name: "Time Entry",
    icon: "nc-icon nc-time-alarm",
    component: TimeEntry,
    layout: "/admin"
  },
  {
    path: "/report",
    name: "Report",
    icon: "nc-icon nc-time-alarm",
    component: Report,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "Users",
    icon: "nc-icon nc-circle-09",
    component: User,
    layout: "/admin",
    roles:['administrator']
  },
  {
    path: "/status",
    name: "Status",
    icon: "nc-icon nc-bullet-list-67",
    component: Status,
    layout: "/admin",
    roles:['administrator']
  },
  {
    path: "/role",
    name: "Role",
    icon: "nc-icon nc-lock-circle-open",
    component: Role,
    layout: "/admin",
    roles:['administrator']
  }
];

export default dashboardRoutes;
