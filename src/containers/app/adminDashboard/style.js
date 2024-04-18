import { makeStyles } from "@mui/styles";
import { primaryColor } from "../../../constants/colors";

const dashboardStyles = makeStyles((theme) => ({
  durationSelect: {
    "&.MuiFormControl-root": {
      width: "100%",
    },
  },
  // Dashboard Cards Style

  customCard: {
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    boxShadow: "none",
    backgroundImage: "none",
    borderRadius: "12px",
    // border: "none rgba(144, 202, 249, 0.46",
    color: "rgb(255, 255, 255)",
    overflow: "hidden",
    position: "relative",
  },
  activeBtn: {
    lineHeight: 1.75,
    minWidth: "64px",
    padding: "4px 10px",
    transition:
      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    backgroundColor: "rgb(33, 150, 243)",
    boxShadow: "none",
    fontWeight: 500,
    borderRadius: "4px",
    color: "#fff",
    textTransform: "capitalize",
    fontFamily: "Roboto, sans-serif",
    margin: "0 5px",
    "&:hover": {
      background: "none",
    },
  },
  inactiveBtn: {
    lineHeight: 1.75,
    minWidth: "64px",
    padding: "4px 10px",
    transition:
      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    backgroundColor: "transparent",
    boxShadow: "none",
    fontWeight: 500,
    borderRadius: "4px",
    color: "#fff",
    textTransform: "capitalize",
    fontFamily: "Roboto, sans-serif",
    margin: "0 5px",
    "&:hover": {
      background: "none",
    },
  },
  count: {
    margin: "14px 8px 6px 0px !important",
    lineHeight: "1.334em !important",
    fontFamily: "Roboto, sans-serif !important",
    fontSize: "2.125rem !important",
    fontWeight: 500,
  },
  avatarStyle: {
    background: "rgb(179, 157, 219) !important",
    cursor: "pointer !important",
    width: "22px !important",
    height: "22px !important",
    marginLeft: 10,
    fontSize: "1rem !important",
    color: "rgb(94, 53, 177) !important",
  },
  title: {
    margin: "0px",
    lineHeight: "1.334em",
    fontFamily: "Roboto, sans-serif",
    color: "rgb(179, 157, 219)",
    fontSize: "1rem",
    fontWeight: 600,
  },
  loginBtn: {
    "&.MuiButton-root": {
      backgroundColor: primaryColor,
      width: "40%",
      padding: "7px",
      "&:hover": {
        backgroundColor: "#e21b70",
      },
    },
  },
  loginBtnText: {
    fontSize: "15px !important",
    textTransform: "none",
    fontWeight: "500 !important",
  },
}));

export default dashboardStyles;
