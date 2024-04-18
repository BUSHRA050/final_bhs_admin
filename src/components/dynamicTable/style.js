import { makeStyles } from "@mui/styles";
import { primaryColor } from "../../constants/colors";

const dynamicTableStyle = makeStyles((theme) => ({
  statusSwitchOn: {
    "&.MuiSwitch-root .MuiSwitch-switchBase": {
      color: primaryColor,
    },
    "&.MuiSwitch-root .MuiSwitch-track": {
      background: primaryColor,
    },
  },
  restSwitch: {
    "&.MuiFormControlLabel-root .MuiSwitch-root .MuiSwitch-track": {
      backgroundColor: "red",
    },
    "&.MuiFormControlLabel-root .MuiSwitch-root .MuiSwitch-switchBase": {
      color: "red",
    },
    "&.MuiFormControlLabel-root": {
      marginTop: "15px",
      marginLeft: "13px",
    },
  },
}));

export default dynamicTableStyle;
