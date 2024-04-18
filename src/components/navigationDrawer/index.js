import React, { useState, useEffect, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Icon,
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context";
import { CustomAppBar, DrawerHeader, CustomDrawer } from "./styledComponents";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import useStyles from "./style";
import { SuperAdminRoutes } from "../../routes/allRoutes";
import { primaryColor } from "../../constants/colors";

export default function NavigationDrawer(props) {
  const userData = JSON.parse(localStorage.getItem("user"));
  const { openDrawer, setOpenDrawer } = useContext(AppContext);
  const classes = useStyles();
  let navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const toggleItem = JSON.parse(localStorage.getItem("toggle_drawer"));

    if (toggleItem) setOpenDrawer(toggleItem);
  }, []);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigateLink = (route) => {
    localStorage.setItem("toggle_drawer", openDrawer);
    navigate(`/${route}`);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CustomAppBar position="fixed" open={openDrawer}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              color: "black",
              ...(openDrawer && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          {/* <Typography variant="h6" noWrap component="div">
            Mini variant drawer
          </Typography> */}

          <div>
            <ListItem
              className={classes.profileHeader}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              style={{ cursor: "pointer", paddingRight: 0 }}
            >
              <ListItemAvatar>
                <Avatar>
                  <img width={40} height={40} src={userData?.image} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={userData?.name} />
            </ListItem>

            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              // transformOrigin={{
              //   vertical: "bottom",
              //   horizontal: "right",
              // }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
              <MenuItem
                onClick={() => {
                  handleClose();
                  localStorage.clear();
                  navigate("/login");
                  // window.location.pathname = "/login";
                }}
                className={classes.menuItemStyle}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </CustomAppBar>
      <CustomDrawer variant="permanent" open={openDrawer}>
        <div
          style={{
            backgroundColor: openDrawer ? primaryColor : "#fff",
            paddingBottom: "25px",
          }}
        >
          <DrawerHeader style={{ minHeight: "42px" }}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon
                  style={{
                    background: "#fff",
                    borderRadius: "50%",
                    fontSize: "12px",
                  }}
                />
              ) : (
                <ChevronLeftIcon
                  style={{
                    background: "#fff",
                    borderRadius: "50%",
                    fontSize: "20px",
                  }}
                />
              )}
            </IconButton>
          </DrawerHeader>

          <div
            style={{
              display: openDrawer ? "flex" : "none",
              justifyContent: "center",
              margin: "15px 0 10px",
            }}
          >
            <ListItemAvatar>
              <Avatar style={{ width: 60, height: 60 }}>
                {/* {userData?.image ? (
                <img width={55} height={55} src={userData.image} />
              ) : ( */}
                <img src={userData?.image} style={{ width: 60, height: 60 }} />
                {/* )} */}
              </Avatar>
            </ListItemAvatar>
          </div>
        </div>
        <List>
          <>
            {userData?.email === "bhsjobportal@gmail.com"
              ? SuperAdminRoutes?.map((route) => {
                return(
                  <ListItem
                  button
                  key={route.id}
                  className={classes.navigationStyle}
                  onClick={() => navigateLink(route.path)}
                >
                  <ListItemIcon className="">
                    <Icon>{route.icon}</Icon>
                  </ListItemIcon>
                  <ListItemText
                    primary={route.name}
                    style={{
                      display: openDrawer ? "block" : "none",
                    }}
                  />
                </ListItem>
                )
              }
              )
              : null}
          </>
        </List>
      </CustomDrawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, overflowX: "auto" }}>
        <div style={{ marginBottom: "50px" }}></div>
        {props.children}
      </Box>
    </Box>
  );
}
