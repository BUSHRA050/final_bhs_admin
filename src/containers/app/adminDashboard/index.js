import React, { useState, useEffect } from "react";
import NavigationDrawer from "../../../components/navigationDrawer";
import DashboardHeadear from "./dashboardHeader";
import useStyles from "./style";
import { Grid, Typography, Avatar } from "@mui/material";
import Loader from "../../../components/loader";
import SaleChart from "./charts";
import OrgChart from "./orgChart";
import "./style.css";

import {
  ArrowUpward as ArrowUpwardIcon,
  Inventory,
  AttachMoney,
  ShoppingCart,
  Restaurant,
  PeopleAlt,
} from "@mui/icons-material";
import { adminDashboard } from "../../../services/adminAuth";

const headerData = [
  {
    id: "orderId",
    numeric: false,
    disablePadding: true,
    label: "Order ID",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: true,
    label: "User Email",
  },
  {
    id: "discount",
    numeric: false,
    disablePadding: true,
    label: "Discount",
  },
  {
    id: "totalBill",
    numeric: true,
    disablePadding: false,
    label: "Total Bill",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
];

let Temp = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let Tempo = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const displayRows = ["orderId", "userEmail", "discount", "totalBill", "status"];

const AdminDashboard = () => {
  const classes = useStyles();
  const [dashboardData, setDashboardData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [orgChartData, setOrgChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [restVal, setRestVal] = useState("");
  const [restOrders, setRestOrders] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async() => {
    try {
      const dashboradData = await adminDashboard();
    if (dashboradData?.status==200) {
      setDashboardData(dashboradData.data.data);
      handleCandidateChart(dashboradData.data.data);
      handleOrgChart(dashboradData.data.data);
    }else{
      console.log("erroror");
    }
    } catch (error) {
      console.log(error,"fkjffkjkfj");
    }
  };

  const handleCandidateChart = (data) => {
    let tempArr = [];
    data?.candidateChartData?.map((val) => {
      tempArr.push({
        month: Temp[val._id.charAt(1) - 1],
        totalnumbers: val.numberofOrganization,
        id: val._id.charAt(1),
      });
    });
    const sortedProducts = tempArr.sort((res1, res2) => res1?.id - res2?.id);
    setChartData(sortedProducts);
  };

  const handleOrgChart = (data) => {
    let tempArrOrg = [];
    data?.organizationChartData?.map((val) => {
      //  console.log(val, "VALLLL");
      //  console.log(Temp[val._id.charAt(1) - 1], "LLLLL");
      tempArrOrg.push({
        month: Tempo[val._id.charAt(1) - 1],
        totalnumbers: val.numberofOrganization,
        id: val._id.charAt(1),
      });
    });
    const sorted = tempArrOrg.sort((res1, res2) => res1.id - res2.id);
    setOrgChartData(sorted);
  };
  
  return (
    <NavigationDrawer>
      <Loader isloading={isLoading} />
      {/* <DashboardHeadear /> */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <div
                className={`${classes.customCard} card-style`}
                style={{ backgroundColor: "#BD4291" }}
              >
                <div className="main-users">
                  <Grid className="avatar-container product-container">
                    <Grid item>
                      <Avatar className="avatar-style">
                        <PeopleAlt />
                      </Avatar>
                    </Grid>
                  </Grid>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    className={classes.count}
                    style={{ color: "white" }}
                  >
                    {dashboardData.totalOrganizations
                      ? dashboardData.totalOrganizations
                      : 0}
                  </Typography>
                  <Avatar
                    className={classes.avatarStyle}
                    style={{ backgroundColor: "#fff8e1" }}
                  >
                    <ArrowUpwardIcon
                      fontSize="inherit"
                      style={{
                        transform: "rotate3d(1, 1, 1, 45deg)",
                        color: "#fff",
                      }}
                    />
                  </Avatar>
                </div>
                <div>
                  <p
                    className={classes.title}
                    style={{ color: "rgb(144, 202, 249)" }}
                  >
                    Total Orginizations
                  </p>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div
                className={`${classes.customCard} card-style`}
                style={{ backgroundColor: "rgb(30, 136, 229)" }}
              >
                <div className="container-two">
                  <Grid
                    container
                    className="avatar-container avatar-container-two"
                  >
                    <Grid item>
                      <Avatar className="avatar-style">
                        <Typography>Rs</Typography>
                      </Avatar>
                    </Grid>
                  </Grid>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography className={classes.count}>
                    {/* {dashboardData.tatolOrder ? dashboardData.tatolOrder : 0} */}
                    1000
                  </Typography>
                  <Avatar className={classes.avatarStyle}>
                    <ArrowUpwardIcon
                      fontSize="inherit"
                      style={{ transform: "rotate3d(1, 1, 1, 45deg)" }}
                    />
                  </Avatar>
                </div>
                <div>
                  <p
                    className={classes.title}
                    style={{ color: "rgb(144, 202, 249)" }}
                  >
                    Total Earning
                  </p>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div
                className={`${classes.customCard} card-style`}
                style={{ backgroundColor: "#BD4291" }}
              >
                <div className="main-users">
                  <Grid className="avatar-container product-container">
                    <Grid item>
                      <Avatar className="avatar-style">
                        <PeopleAlt />
                      </Avatar>
                    </Grid>
                  </Grid>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    className={classes.count}
                    style={{ color: "white" }}
                  >
                    {dashboardData.totalCandidate
                      ? dashboardData.totalCandidate
                      : 0}
                  </Typography>
                  <Avatar
                    className={classes.avatarStyle}
                    style={{ backgroundColor: "#fff8e1" }}
                  >
                    <ArrowUpwardIcon
                      fontSize="inherit"
                      style={{
                        transform: "rotate3d(1, 1, 1, 45deg)",
                        color: "#fff",
                      }}
                    />
                  </Avatar>
                </div>
                <div>
                  <p
                    className={classes.title}
                    style={{ color: "rgb(144, 202, 249)" }}
                  >
                    Total Candidates
                  </p>
                </div>
              </div>
            </Grid>

            <Grid container spacing={1} mt={2}>
              <Grid item xs={12} sm={12} md={6}>
                <Typography className={classes.count} style={{textAlign:"center"}}>
                  Candidates
                </Typography>
                {chartData?.length > 0 ? <SaleChart data={chartData} /> : null}
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
              <Typography className={classes.count} style={{textAlign:"center"}}>
                  Organizations
                </Typography>
                {orgChartData?.length > 0 ? (
                  <OrgChart data={orgChartData} />
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </NavigationDrawer>
  );
};

export default AdminDashboard;
