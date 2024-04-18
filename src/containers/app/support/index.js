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
import { editResturantProfile } from "../../../services/organizationProfile";
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


const Support = () => {
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
  const [value, setValue] = useState("customer");
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

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // console.log(value,"valueeeeeee====>");

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
    // handlegetComplaints();
  }, [value]);
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

  const handlegetComplaints = () => {
    setIsLoading(true);
    getSupportMessages(value)
      .then((response) => {
        if (response.data.status == "ok") {
          console.log(response.data, "positveresponse====>");
          setComplaints(response?.data?.data);
          setIsLoading(false);
        } else {
          console.log(response.data, "neagtiveres====>");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error, "error");
        setIsLoading(false);
      });
  };

  const handleUpdateComplaintStatus=(id)=>{
    let payload={
      status:"completed"
    }
    setIsLoading(true)
    upadteSupportStatus(id,payload).then((response)=>{
        if (response?.data?.status == "ok") {
          setIsLoading(false)
          handleSnackbarVal(true, "success", response?.data?.message);
          handlegetComplaints()
        }
        else{
          handleSnackbarVal(true, "error", response?.data?.message);
          setIsLoading(false)
        }
    }).catch((error)=>{
      setIsLoading(false)
      console.log(error,"error");
    })
  }


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
          Support
        </Typography>
      </div>
      <div style={{ flexGrow: 1, backgroundColor: "white" }}>
        <TabContext value={value}>
        <AppBar position="static">
          <TabList onChange={handleChange} aria-label="simple tabs example" style={{backgroundColor:primaryColor}}>
            <Tab label="Organizations" value="orginizations" style={{color:"white"}}/>
            <Tab label="Users" value="users" style={{color:"white"}}/>
          </TabList>
        </AppBar>
        <TabPanel value="customer">
        {complaints.length > 0 ? (
        complaints.map((item,index)=>{
          const{name,email,phoneNumber,message,date,status,_id}=item
          return(
            <>
            <div style={{backgroundColor:colors.grey,width:"35%",padding:"10px",borderRadius:"8px"}}>
            <Typography>Name : {name}</Typography>
            <Typography>Email : {email}</Typography>
            <Typography>Phone Number : {phoneNumber}</Typography>
            <Typography>Message : {message}</Typography>
            <Typography>Date : {date}</Typography>
            <Typography>Status : {status}</Typography>
            </div>
            {status == "completed" ? null
            :
            <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleUpdateComplaintStatus(_id)}
                    disableRipple
                    style={{
                      width: "25%",
                      backgroundColor: primaryColor,
                      textTransform: "none",
                      marginTop: "10px",
                    }}
                  >
                    <Typography style={{ fontSize: "12px" }}>Complete</Typography>
                  </Button>
                  }
            </>
          )
        })
          ) :
        (
          <Typography style={{textAlign:"center"}}>No data found</Typography>

        )
      }
        </TabPanel>
        <TabPanel value="merchant">
          {complaints.length > 0 ? (
        complaints.map((item,index)=>{
          const{name,email,phoneNumber,message,date,status,_id}=item
          return(
            <>
            <div style={{backgroundColor:colors.grey,width:"35%",padding:"10px",borderRadius:"8px"}}>
            <Typography>Name : {name}</Typography>
            <Typography>Email : {email}</Typography>
            <Typography>Phone Number : {phoneNumber}</Typography>
            <Typography>Message : {message}</Typography>
            <Typography>Date : {date}</Typography>
            <Typography>Status : {status}</Typography>
            </div>
            {status == "completed" ? null
            :
            <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleUpdateComplaintStatus(_id)}
                    disableRipple
                    style={{
                      width: "25%",
                      backgroundColor: primaryColor,
                      textTransform: "none",
                      marginTop: "10px",
                    }}
                  >
                    <Typography style={{ fontSize: "12px" }}>Complete</Typography>
                  </Button>
                  }
            </>
          )
        })
          ) :
        (
          <Typography style={{textAlign:"center"}}>No data found</Typography>
        )
      }
        </TabPanel>
        <TabPanel value="driver">
        {complaints.length > 0 ? (
        complaints.map((item,index)=>{
          const{name,email,phoneNumber,message,date,status,_id}=item
          return(
            <>
            <div style={{backgroundColor:colors.grey,width:"35%",padding:"10px",borderRadius:"8px"}}>
            <Typography>Name : {name}</Typography>
            <Typography>Email : {email}</Typography>
            <Typography>Phone Number : {phoneNumber}</Typography>
            <Typography>Message : {message}</Typography>
            <Typography>Date : {date}</Typography>
            <Typography>Status : {status}</Typography>
            </div>
            {status == "completed" ? null
            :
            <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleUpdateComplaintStatus(_id)}
                    disableRipple
                    style={{
                      width: "25%",
                      backgroundColor: primaryColor,
                      textTransform: "none",
                      marginTop: "10px",
                    }}
                  >
                    <Typography style={{ fontSize: "12px" }}>Complete</Typography>
                  </Button>
                  }
            </>
          )
        })
          ) :
        (
          <Typography style={{textAlign:"center"}}>No data found</Typography>
        )
      }

        </TabPanel>
      </TabContext>
      </div>
    </NavigationDrawer>
  );
};

export default Support;
