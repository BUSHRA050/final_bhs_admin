import React, { useState } from "react";
import { Button, TextField, CircularProgress, Typography } from "@mui/material";
// import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { primaryColor } from "../../../constants/colors";
import useStyles from "../../../globalStyles";
import AuthBackground from "../../../components/authBackground";
import Swal from "sweetalert2";
import axios from "axios";
import { adminLogin } from "../../../services/adminAuth";

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (email == "" || password == "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Email & password are required",
        confirmButtonColor: "red",
      });
    } else {
      let data = {
        email,
        password,
      };
      setIsLoading(true);

      adminLogin(data)
        .then((response) => {
          console.log(response, "RESSSSSSSSSSSs");
          if (response.data.status == "error") {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: response?.data?.message,
              confirmButtonColor: "red",
            });
            setIsLoading(false);
          } else {
            let newObj = {
              ...response.data.data.userDetails,
            };
            setIsLoading(false);
            localStorage.setItem("user_token", response.data.data.token);
            localStorage.setItem("user", JSON.stringify(newObj));
            setEmail("");
            setPassword("");
            window.location.pathname = "/";
          }
          console.log(response, "Response===>");
        })
        .catch((error) => {
          console.log(error, "ERRRRRRR");
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error?.response?.data?.message,
            confirmButtonColor: "red",
          });
          setIsLoading(false);
          console.log(error.response, "EROORRRRR");
        });
    }
  };

  return (
    <AuthBackground>
      <div className={classes.paper}>
        <Typography style={{ fontSize: "25px", fontWeight: "600" }}>
          Welcome!
        </Typography>
        <Typography style={{ fontWeight: "500" }}>
          Sign in to continue
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          id="email"
          placeholder="Email"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          className={classes.globalInput}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={(e) => (e.key == "Enter" ? handleLogin() : null)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          id="password"
          className={classes.globalInput}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={(e) => (e.key == "Enter" ? handleLogin() : null)}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "10px 0",
          }}
        >
          {/* <Typography
            onClick={() => navigate("/forgotPassword")}
            style={{ color: primaryColor, cursor: "pointer" }}
          >
            Forgot Password
          </Typography> */}
        </div>
        <div style={{ textAlign: "center", width: "100%" }}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Button
              variant="contained"
              className={classes.loginBtn}
              size="small"
              onClick={handleLogin}
              disableRipple
            >
              <Typography className={classes.loginBtnText}>Sign In</Typography>
            </Button>
          )}
        </div>
      </div>
    </AuthBackground>
  );
};

export default Login;
