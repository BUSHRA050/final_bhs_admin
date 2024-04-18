import React from "react";

//Super Admin Screens

import AdminDashboard from "../../containers/app/adminDashboard";
import AdminSettings from "../../containers/app/adminSettings";
import Orginization from "../../containers/app/orginization/index";
import Users from "../../containers/app/users";
import Support from "../../containers/app/support";

const SuperAdminRoutes = [
  {
    id: 1,
    name: "Dashboard",
    component: <AdminDashboard />,
    exact: "exact",
    path: "",
    icon: "dashboard",
  },

  {
    id: 2,
    name: "Organization",
    component: <Orginization />,
    exact: "exact",
    path: "orginizations",
    icon: "group",
  },
  {
    id: 3,
    name: "Users",
    component: <Users />,
    exact: "exact",
    path: "users",
    icon: "accessible",
  },
  {
    id: 7,
    name: "Settings",
    component: <AdminSettings />,
    exact: "exact",
    path: "adminSettings",
    icon: "settings",
  },
  {
    id: 8,
    name: "Support",
    component: <Support/>,
    exact: "exact",
    path: "Support",
    icon:"settings",
  },
  
];

export { SuperAdminRoutes };
