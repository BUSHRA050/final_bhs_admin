import { makeStyles } from "@mui/styles";
import { primaryColor } from "../../../constants/colors";

const driverStyle = makeStyles((theme) => ({
  loginBtn: {
    "&.MuiButton-root": {
      backgroundColor: primaryColor,
      width: "10%",
      padding: "10px",
      marginLeft: "20px",
      "&:hover": {
        backgroundColor: "#e21b70",
      },
    },
  },
  loginBtnText: {
    fontSize: "12px !important",
    textTransform: "none",
    fontWeight: "500 !important",
  },
}));

export default driverStyle;
