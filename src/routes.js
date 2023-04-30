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
import Status from "views/Status"
import Role from "views/Role";
import User from "views/User";
import Project from "views/Project";
import TimeEntry from "views/TimeEntry";
import ReportTotalTime from "views/ReportTotalTime";
import ReportIndividualTimeEntry from "views/ReportIndividualTimeEntry"
import ReportMemberInProject from "views/ReportMemberInProject";
import ReportTotalProject from "views/ReportTotalProject";
import ReportTotalUser from "views/ReportTotalUser";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
    roles:['administrator','project manager','project member']
  },
  {
    path: "/timeEntry",
    name: "Time Entry",
    icon: "nc-icon nc-time-alarm",
    component: TimeEntry,
    layout: "/admin",
    roles:['administrator','project manager','project member']
  },
  {
    path: "/project",
    name: "Project",
    icon: "nc-icon nc-tablet-2",
    component: Project,
    layout: "/admin",
    roles:['administrator','project manager']
  },
  {
    path: "/reportTotalTime",
    name: "Report Total Time",
    icon: "nc-icon  nc-single-copy-04",
    component: ReportTotalTime,
    layout: "/admin",
    roles:['administrator','project manager']
  },
  {
    path: "/reportIndividualTimeEntry",
    name: "Report Individual Time Entry",
    icon: "nc-icon  nc-single-copy-04",
    component: ReportIndividualTimeEntry,
    layout: "/admin",
    roles:['administrator','project manager']
  },
  {
    path: "/reportMemberInProject",
    name: "Report Member In Project",
    icon: "nc-icon  nc-single-copy-04",
    component: ReportMemberInProject,
    layout: "/admin",
    roles:['administrator','project manager']
  },
  {
    path: "/reportTotalProject",
    name: "Report Total Project",
    icon: "nc-icon  nc-single-copy-04",
    component: ReportTotalProject,
    layout: "/admin",
    roles:['administrator','project manager']
  },
  {
    path: "/reportTotalUser",
    name: "Report Total User",
    icon: "nc-icon  nc-single-copy-04",
    component: ReportTotalUser,
    layout: "/admin",
    roles:['administrator']
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
