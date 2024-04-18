import { makeStyles } from "@mui/styles";
import { colors, primaryColor } from "../constants/colors";

const useStyles = makeStyles((theme) => ({
  // Login Styles

  loginContainer: {
    backgroundColor: "#fff",
    // justifyContent: "center",
    // alignItems: "center",
    padding: "30px 20px",
    boxShadow: "0 0.2rem 1rem rgb(0 0 0 / 12%) !important",

    [theme.breakpoints.down("600")]: {
      width: "80%",
      padding: 0,
    },
  },
  root: {
    height: "100vh",
    // backgroundImage: "url(https://media.istockphoto.com/vectors/abstract-simple-geometric-vector-seamless-pattern-with-gold-line-on-vector-id1160720443)",
    justifyContent: "center",
    // alignItems: "center",
    flexDirection: "column",
  },

  paper: {
    margin: theme.spacing(3, 3),
  },

  globalInput: {
    width: "100%",
    "&.MuiFormControl-root .MuiInputBase-root .MuiInputBase-input": {
      padding: "10.2px 12px !important",
      fontSize: "14px !important",
    },
    "&.MuiFormControl-root .MuiInputBase-root .MuiInputBase-input::placeholder":
      {
        fontSize: "14px !important",
      },
  },

  loginHead: {
    color: primaryColor,
    fontWeight: "bold !important",
    marginLeft: "40px !important",
  },
  loginBtn: {
    "&.MuiButton-root": {
      backgroundColor: primaryColor,
      width: "100%",
      padding: "6px",
      "&:hover": {
        backgroundColor:colors.orange,
      },
    },
  },
  loginBtnText: {
    fontSize: "18px !important",
    textTransform: "none",
    fontWeight: "500 !important",
  },

  // ADD NEW GLoabl Button

  globalBtnStyle: {
    textTransform: "none !important",
    background: `${primaryColor} !important`,
  },

  globalInputLabel: {
    fontSize: "13px !important",
    margin: "5px 0",
  },

  globalDialogContentStyle: {
    background: "red",
  },

  globalSelectStyle: {
    width: "100%",
    "&.MuiFormControl-root .MuiInputBase-root .MuiSelect-select": {
      padding: "8px 12px !important",
      fontSize: "12px !important",
    },
    "&.MuiFormControl-root .MuiInputBase-root input": {
      fontSize: "12px !important",
    },
  },
  dashboardSelect: {
    width: "100%",
    height: "40px",
    fontSize: "12px !important",
    borderRadius: "5px !important",
    borderColor: "#ccc",
    "&:focus": {
      boxShadow:
        "inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 8px rgb(102 175 233 / 60%)",
      borderColor: "#66afe9 !important",
    },
    outline: "none",
  },
}));

export default useStyles;
