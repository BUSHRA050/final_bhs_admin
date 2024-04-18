import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  InputLabel,
  TextField,
  Typography,
  AppBar,
  Box,
  Tab
} from "@mui/material";
import NavigationDrawer from "../../../components/navigationDrawer";
import { primaryColor } from "../../../constants/colors";
import { colors } from "../../../constants/colors";
import useStyles from "../../../globalStyles";
import SnackbarAlert from "../../../components/snackbar/SnackbarAlert";
import { adminChangePass } from "./../../../services/adminSettings/index";
import Loader from "../../../components/loader";
import ImageUploader from "./../../../components/imageUploader/index";
import {
  createCertificationLink,
  getCertificationLink,
  updateCertificationLink,
  getPerKmCharges,
  upadtePerKmCharges,
  createPerKmCharges,
  getSupportMessages,
  upadteSupportStatus
} from "./../../../services/adminSettings/index";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { NumbersOutlined } from "@mui/icons-material";
const AdminSettings = () => {
  const classes = useStyles();
  const userData = JSON.parse(localStorage.getItem("user"));
  const [inputValue, setInputValue] = useState({
    name: userData.name,
    email: "",
    currentPassword: "",
    newPassword: "",
    link: "",
    charges: "",
  });
  const [linkId, setLinkId] = useState("");
  const [chargesId, setChargesId] = useState("");
  const [snackbarProps, setSnackbarProps] = useState({
    open: false,
    type: "",
    message: "",
  });
  const [image, setImage] = useState(userData?.image);
  const [isLoading, setIsLoading] = useState(false);
  const [complaints,setComplaints]=useState([]);
  const handleSnackbarVal = (open, type, message) => {
    setSnackbarProps({
      open,
      type,
      message,
    });
  };
  const handleChangeValue = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleUpdateUsername = () => {
    if (inputValue.name == "") {
      handleSnackbarVal(true, "error", "Name cannot be empty");
    } else {
      const payload = { name: inputValue.name, image };
      // setIsLoading(true);
      // editResturantProfile(userData._id, payload)
      //   .then((res) => {
      //     let newObj = {
      //       ...userData,
      //       name: res.data.data.name,
      //       image: image,
      //     };
      //     setIsLoading(false);
      //     localStorage.setItem("user", JSON.stringify(newObj));
      //     handleSnackbarVal(true, "success", res.data.message);
      //   })
      //   .catch((error) => {
      //     console.log(error, "Error");
      //     setIsLoading(false);
      //     handleSnackbarVal(true, "error", error?.response?.data?.message);
      //   });
    }
  };


  const handleUpdatePass = () => {
    if (inputValue.currentPassword == "" || inputValue.newPassword == "") {
      handleSnackbarVal(true, "error", "Password fields cannot be empty");
    } else {
      const payload = {
        email: userData.email,
        password: inputValue.currentPassword,
        newPassword: inputValue.newPassword,
      };
      setIsLoading(true);
      adminChangePass(payload)
        .then((res) => {
          setIsLoading(false);
          handleSnackbarVal(true, "success", res.data.message);
          setInputValue({
            email: userData.email,
            password: "",
            newPassword: "",
          });
        })
        .catch((error) => {
          console.log(error, "Error");
          setIsLoading(false);
          setInputValue({
            email: userData.email,
            password: "",
            newPassword: "",
          });
          handleSnackbarVal(true, "error", error?.response?.data?.message);
        });
    }
  };

 
  useEffect(() => {
    getLink();
    getCharges();
  }, []);
  const handleCloseSnackbar = () => {
    handleSnackbarVal(false, "", "");
  };

  const handleCreateLink = (type) => {
    let payload = {
      link: inputValue.link,
    };
    if (type == "add") {
      setIsLoading(true);
      if (inputValue.link == "") {
        handleSnackbarVal(true, "error", "Link is required");
        setIsLoading(false);
      } else {
        createCertificationLink(payload)
          .then((res) => {
            if (res?.data?.status == "ok") {
              setInputValue({
                link: "",
              });
              setIsLoading(false);
              handleSnackbarVal(true, "success", res?.data?.message);
              getLink();
            } else {
              setIsLoading(false);
              handleSnackbarVal(true, "error", res?.data?.message);
            }
          })
          .catch((error) => {
            console.log(error, "error");
            setIsLoading(false);
          });
      }
    } else {
      setIsLoading(true);
      if (inputValue.link == "") {
        handleSnackbarVal(true, "error", "Link is required");
        setIsLoading(false);
      } else {
        updateCertificationLink(linkId, payload)
          .then((res) => {
            if (res?.data?.status == "ok") {
              setInputValue({
                link: "",
              });
              setIsLoading(false);
              handleSnackbarVal(true, "success", res?.data?.message);
              getLink();
            } else {
              setIsLoading(false);
              handleSnackbarVal(true, "error", res?.data?.message);
            }
          })
          .catch((error) => {
            console.log(error, "error");
            setIsLoading(false);
          });
      }
    }
  };

  const getLink = () => {
    setIsLoading(true);
    getCertificationLink()
      .then((response) => {
        if (response?.data?.status == "ok") {
          setInputValue({
            link: response?.data?.data?.link,
          });
          setLinkId(response?.data?.data?._id);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error, "");
        setIsLoading(false);
      });
  };

  const handleCreateCharges = (type) => {
    let payload = {
      charges: inputValue.charges,
    };
    if (type == "add") {
      setIsLoading(true);
      if (inputValue.charges == "") {
        handleSnackbarVal(true, "error", "Charges are required");
        setIsLoading(false);
      } else {
        createPerKmCharges(payload)
          .then((res) => {
            if (res?.data?.status == "ok") {
              setInputValue({
                charges: "",
              });
              setIsLoading(false);
              handleSnackbarVal(true, "success", res?.data?.message);
              getCharges();
            } else {
              setIsLoading(false);
              handleSnackbarVal(true, "error", res?.data?.message);
            }
          })
          .catch((error) => {
            console.log(error, "error");
            setIsLoading(false);
          });
      }
    } else {
      setIsLoading(true);
      if (inputValue.charges == "") {
        handleSnackbarVal(true, "error", "Charges are required");
        setIsLoading(false);
      } else {
        console.log(payload, "payloadddddddd=>");
        console.log(chargesId, "jkdjkdjjkdjkj");
        upadtePerKmCharges(chargesId, payload)
          .then((res) => {
            console.log(res?.data, "siuusousui");
            if (res?.data?.status == "ok") {
              setInputValue({
                charges: "",
              });
              setIsLoading(false);
              handleSnackbarVal(true, "success", res?.data?.message);
              getCharges();
            } else {
              setIsLoading(false);
              handleSnackbarVal(true, "error", res?.data?.message);
            }
          })
          .catch((error) => {
            console.log(error, "error");
            setIsLoading(false);
          });
      }
    }
  };
  const getCharges = () => {
    setIsLoading(true);
    getPerKmCharges()
      .then((response) => {
        if (response?.data?.status == "ok") {
          setInputValue({
            charges: `${response?.data?.data?.charges}`,
          });
          setChargesId(response?.data?.data?._id);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error, "");
        setIsLoading(false);
      });
  };

  


  return (
    <NavigationDrawer>
      <Loader isloading={isLoading} />
      <SnackbarAlert
        snackbarProps={snackbarProps}
        handleCloseSnackbar={handleCloseSnackbar}
      />
      <div
        style={{
          boxShadow: "0 0.2rem 1rem rgb(0 0 0 / 12%)",
          padding: "20px",
        }}
      >
        <Typography style={{ fontSize: "22px", fontWeight: "600" }}>
          Edit Profile
        </Typography>
        {/* <Grid container spacing={2}>
          <Grid item xs={4}>
            <InputLabel style={{ margin: "5px 0", fontWeight: "600" }}>
              Change Image
            </InputLabel>
            <div style={{ textAlign: "left" }}>
              <ImageUploader image={image} setImage={setImage} type="profile" />
            </div>
          </Grid>
          <Grid item xs={12}>
            <InputLabel style={{ margin: "5px 0", fontWeight: "600" }}>
              Change User Name
            </InputLabel>
            <TextField
              variant="outlined"
              placeholder="User Name"
              name="name"
              autoComplete="name"
              style={{ width: "30%" }}
              className={classes.globalInput}
              onChange={handleChangeValue}
              value={inputValue.name}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <div style={{ width: "25%", textAlign: "right" }}>
              <Button
                variant="contained"
                size="small"
                onClick={handleUpdateUsername}
                disableRipple
                style={{
                  width: "42%",
                  backgroundColor: primaryColor,
                  textTransform: "none",
                  marginTop: "10px",
                }}
              >
                <Typography style={{ fontSize: "12px" }}>
                  Update Profile
                </Typography>
              </Button>
            </div>
          </Grid>
        </Grid> */}

        <Grid container marginTop={3} spacing={2}>
          <Grid item xs={12} sm={12}>
            <InputLabel style={{ margin: "5px 0", fontWeight: "600" }}>
              Change Password
            </InputLabel>
            <TextField
              variant="outlined"
              placeholder="Email"
              disabled
              name="email"
              autoComplete="email"
              className={classes.globalInput}
              onChange={handleChangeValue}
              value={userData.email}
              style={{ width: "25%" }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              variant="outlined"
              placeholder="Current Password"
              name="currentPassword"
              type="password"
              className={classes.globalInput}
              onChange={handleChangeValue}
              value={inputValue.currentPassword}
              style={{ width: "25%" }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              variant="outlined"
              placeholder="New Password"
              name="newPassword"
              type="password"
              className={classes.globalInput}
              onChange={handleChangeValue}
              value={inputValue.newPassword}
              style={{ width: "25%" }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <div style={{ width: "25%", textAlign: "right" }}>
              <Button
                variant="contained"
                size="small"
                onClick={handleUpdatePass}
                disableRipple
                style={{
                  width: "42%",
                  backgroundColor: primaryColor,
                  textTransform: "none",
                  marginTop: "10px",
                }}
              >
                <Typography style={{ fontSize: "12px" }}>
                  Update Password
                </Typography>
              </Button>
            </div>
          </Grid>
        </Grid>
        <Grid container marginTop={3} spacing={2}>
          <>
            {/* <Grid item xs={6} sm={6}>
              <InputLabel style={{ margin: "5px 0", fontWeight: "600" }}>
                Certification Link
              </InputLabel>
              <TextField
                variant="outlined"
                placeholder="Certification Link"
                name="link"
                className={classes.globalInput}
                onChange={handleChangeValue}
                value={inputValue.link}
                style={{ width: "50%" }}
              />
              <div style={{ width: "50%" }}>
                {inputValue.link !== "" ? (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleCreateLink("edit")}
                    disableRipple
                    style={{
                      width: "50%",
                      backgroundColor: primaryColor,
                      textTransform: "none",
                      marginTop: "10px",
                    }}
                  >
                    <Typography style={{ fontSize: "12px" }}>Update</Typography>
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleCreateLink("add")}
                    disableRipple
                    style={{
                      width: "50%",
                      backgroundColor: primaryColor,
                      textTransform: "none",
                      marginTop: "10px",
                    }}
                  >
                    <Typography style={{ fontSize: "12px" }}>Create</Typography>
                  </Button>
                )}
              </div>
            </Grid> */}

            {/* <Grid item xs={6} sm={6}>
              <InputLabel style={{ margin: "5px 0", fontWeight: "600" }}>
                Per Kilometer Charges
              </InputLabel>
              <TextField
                variant="outlined"
                placeholder="Per Kilometer Charges"
                name="charges"
                className={classes.globalInput}
                onChange={handleChangeValue}
                value={inputValue.charges}
                style={{ width: "50%" }}
              />
              <div style={{ width: "50%" }}>
                {inputValue.charges !== "" ? (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleCreateCharges("edit")}
                    disableRipple
                    style={{
                      width: "50%",
                      backgroundColor: primaryColor,
                      textTransform: "none",
                      marginTop: "10px",
                    }}
                  >
                    <Typography style={{ fontSize: "12px" }}>Update</Typography>
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleCreateCharges("add")}
                    disableRipple
                    style={{
                      width: "50%",
                      backgroundColor: primaryColor,
                      textTransform: "none",
                      marginTop: "10px",
                    }}
                  >
                    <Typography style={{ fontSize: "12px" }}>Create</Typography>
                  </Button>
                )}
              </div>
            </Grid> */}
          </>
        </Grid>
      </div>
    </NavigationDrawer>
  );
};

export default AdminSettings;
