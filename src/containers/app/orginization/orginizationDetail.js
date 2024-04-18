import NavigationDrawer from "../../../components/navigationDrawer/index";
import restaurantStyle from "./style";
import { useLocation } from "react-router-dom";
import {
  Button,
  Container,
  FormControlLabel,
  Grid,
  styled,
  Switch,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import moment from "moment";
import {
  updateOrginizationStatus,
  getOrginizationById,
  getSubscriptionPlanById
} from "../../../services/organization";
import Loader from "../../../components/loader";
import SnackbarAlert from "../../../components/snackbar/SnackbarAlert";
import { colors, primaryColor } from "../../../constants/colors/index";


const RestaurantDetail = () => {
  const classes = restaurantStyle();
  const location = useLocation();
  const [active, setActive] = useState(false);
  const [details, setDetails] = useState({});
  const [isFeatured, setIsFeatured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [plansData,setPlansData]=useState([])
  const [activePlan, setActivePlan] = useState("");
  const [snackbarProps, setSnackbarProps] = useState({
    open: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    handlegetOrginizationDetails();
    handleGetSubscriptionPlan();
  }, []);

  const handleCloseSnackbar = () => {
    handleSnackbarVal(false, "", "");
  };

  const handlegetOrginizationDetails = () => {
    setIsLoading(true);
    getOrginizationById(location.state._id)
      .then((res) => {
        console.log(res?.data?.data, "ressssss");
        // let data = res.data.data.reverse();
        setIsLoading(false);
        setDetails(res?.data?.data);
        setActivePlan(res?.data?.data?.plan)
        console.log(res?.data?.data?.merchantImage, "iiiuuiiuiiiuu");
      })
      .catch((err) => {
        console.log(err, "errr");
        setIsLoading(false);
      });
  };


  const handleGetSubscriptionPlan=()=>{
    setIsLoading(true);
    getSubscriptionPlanById(location.state._id)
    .then((res) => {
      console.log(res?.data?.data, "ressssss");
      // let data = res.data.data.reverse();
      setIsLoading(false);
      setPlansData(res?.data?.data);
      console.log(res?.data?.data?.merchantImage, "iiiuuiiuiiiuu");
    })
    .catch((err) => {
      console.log(err, "errr");
      setIsLoading(false);
    });
  }

  console.log(plansData,"dlkdldkdkdkdldl");
  const handleSnackbarVal = (open, type, message) => {
    setSnackbarProps({
      open,
      type,
      message,
    });
  };
  const handleUpdateOrginizationStatus = (type) => {
    if (type == "paid") {
      var payload = {
        isPaid: !details?.isPaid,
      };
    } else {
      var payload = {
        isFeatured: !details?.isFeatured,
      };
    }
    setIsLoading(true);
    updateOrginizationStatus(location.state._id, payload)
      .then((res) => {
        handlegetOrginizationDetails();
        setIsLoading(false);
        handleSnackbarVal(true, "success", res?.data?.message);
      })
      .catch((err) => {
        setIsLoading(false);
        handleSnackbarVal(true, "error", err?.response?.data?.message);
      });
  };


  const handleUpdateOrginizationSubscriptionPlan = (type) => {
    const nextDate = new Date()
    nextDate.setDate(new Date().getDate() + 365)
    const formatedDate = moment(nextDate).format("YYYY-MM-DD")
    let currentDate = moment(new Date()).format("YYYY-MM-DD")
      var payload = {
        isPaid:true,
        plan:activePlan,
        planStartDate:currentDate,
        planEndDate:formatedDate,
    }
    setIsLoading(true);
    updateOrginizationStatus(location.state._id, payload)
      .then((res) => {
        handlegetOrginizationDetails();
        setIsLoading(false);
        handleSnackbarVal(true, "success", res?.data?.message);
      })
      .catch((err) => {
        setIsLoading(false);
        handleSnackbarVal(true, "error", err?.response?.data?.message);
      });
  };
  const StyledTypo = styled(Typography)`
    font-size: 15px;
    font-weight: 600;
    padding-top: 5px;
  `;

  // const current=new Date()
  // current.setDate(new Date().getDate())
  // moment(current).format("YYYY-MM-DD")
  // console.log(current,"mlskdkkldkldkdkl");

  console.log(activePlan,"jjdhjhdhdjhdjdjdhj");
  let currentDate = moment(new Date()).format("YYYY-MM-DD");
  console.log(typeof currentDate, "jjkjkjjkjjk");
  return (
    <NavigationDrawer>
      <Loader isloading={isLoading} />
      <SnackbarAlert
        snackbarProps={snackbarProps}
        handleCloseSnackbar={handleCloseSnackbar}
      />
      <Container>
        <div
          style={{
            boxShadow: "0 0.2rem 1rem rgb(0 0 0 / 12%)",
            padding: "20px",
          }}
        >
          <Typography style={{ fontSize: "22px", fontWeight: "600" }}>
            Organization Details
          </Typography>

          <div style={{ margin: "10px 0" }}>
            <img
              src={location.state.userImage}
              style={{ width: "100px", borderRadius: "50%", height: "100px" }}
            />
            <div style={{background:primaryColor,borderRadius:"10px",padding:"2px 5px 5px 2px",marginBottom:"10px"}}>
            <StyledTypo>
              Name: <span style={{ fontWeight: "500" }}>{details?.name}</span>
            </StyledTypo>
            </div>
            <div style={{background:primaryColor,borderRadius:"10px",padding:"2px 5px 5px 2px",marginBottom:"10px"}}>
            <StyledTypo>
              Email: <span style={{ fontWeight: "500" }}>{details?.email}</span>
            </StyledTypo>
            </div>
            <div style={{background:primaryColor,borderRadius:"10px",padding:"2px 5px 5px 2px",marginBottom:"10px"}}>
            <StyledTypo>
              Phone Number:{" "}
              <span style={{ fontWeight: "500" }}>{details?.phoneNumber}</span>
            </StyledTypo>
            </div>
            <div style={{background:primaryColor,borderRadius:"10px",padding:"2px 5px 5px 2px",marginBottom:"10px",marginBottom:"10px"}}>
            <StyledTypo>
              Active Plan:{" "}
              <span style={{ fontWeight: "500" }}>{details?.plan}</span>
            </StyledTypo>
            </div>
            <div style={{background:primaryColor,borderRadius:"10px",padding:"2px 5px 5px 2px",marginBottom:"10px"}}>
            <StyledTypo>
              Registration Date:{" "}
              <span style={{ fontWeight: "500" }}>
                {moment(details?.date).format("YYYY-MM-DD")}
              </span>
            </StyledTypo>
            </div>
            <div style={{background:primaryColor,borderRadius:"10px",padding:"2px 5px 5px 2px",marginBottom:"10px"}}>
            <StyledTypo>
              Plan Start Date:{" "}
              <span style={{ fontWeight: "500" }}>
                {details?.planStartDate}
              </span>
            </StyledTypo>
            </div>
            <div style={{background:primaryColor,borderRadius:"10px",padding:"2px 5px 5px 2px",marginBottom:"10px"}}>
              
            <StyledTypo>
              Plan End Date:{" "}
              <span style={{ fontWeight: "500" }}>{details?.planEndDate}</span>
            </StyledTypo>
              </div>
            {/* <StyledTypo>
              Plan Status:{" "}
              <span style={{ fontWeight: "500" }}>{details?.planEndDate === currentDate ? "Avtive" : "Expired"}</span>
            </StyledTypo> */}
            {location.state.isApprove && (
              <>
                <div>
                  <FormControlLabel
                    className={details?.isFeatured ? classes.restSwitch : ""}
                    control={
                      <Switch
                      // color={colors.primaryColor}
                      />
                    }
                    label={details?.isFeatured ? "Featured" : "Add to Feature"}
                    checked={details?.isFeatured}
                    onChange={() => handleUpdateOrginizationStatus("featured")}
                  />
                </div>

                <div>
                  <FormControlLabel
                    className={details?.isPaid ? classes.restSwitch : ""}
                    control={<Switch />}
                    label={details?.isPaid ? "Paid" : "Unpaid"}
                    checked={details?.isPaid}
                    onChange={() => handleUpdateOrginizationStatus("paid")}
                  />
                </div>
                <Grid item xs={12} md={2}>
                  <StyledTypo>
                    Select Plan for Organization
                  </StyledTypo>
                  <FormControl className={classes.durationSelect} size="small">
                    <Select  value={activePlan} onChange={(e)=>setActivePlan(e.target.value)}>
                    {/* <MenuItem value="Free">Free</MenuItem> */}
                      <MenuItem value="Basic">Basic</MenuItem>
                      <MenuItem value="Standard">Standard</MenuItem>
                      <MenuItem value="Premium">Premium</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </>
            )}
             <Grid container spacing={3}>
            {plansData.map((item) => {
              return (
                <Grid item xs={12} sm={6} md={4} marginTop={2}>
                  <div
                    style={{
                      borderRadius: "20px",
                      boxShadow: "0 0.2rem 1rem rgb(0 0 0 / 12%)",
                      padding: "10px",
                    }}
                  >
                    <img
                      src={item.image}
                      style={{ width: "100%", height: 220 }}
                    />
                    <StyledTypo>
                      Puchased Plan:{" "}
                      <span style={{ fontWeight: "500" }}>{item.purchasedPlan}</span>
                    </StyledTypo>
                    <StyledTypo>
                      Date:{" "}
                      <span style={{ fontWeight: "500" }}>{item.date}</span>
                    </StyledTypo>
                    {/* <StyledTypo>
                      Quantity:{" "}
                      <span style={{ fontWeight: "500" }}>
                        {item.selectedQty}
                      </span>
                    </StyledTypo>
                    <StyledTypo>
                      Price:{" "}
                      <span style={{ fontWeight: "500" }}>
                        {item.selectedQty * item.price}
                      </span>
                    </StyledTypo> */}
                  </div>
                </Grid>
              );
            })}
          </Grid>
          <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                className={classes.loginBtn}
                size="medium"
                onClick={handleUpdateOrginizationSubscriptionPlan}
                disableRipple
                style={{ backgroundColor:colors.primaryColor,width:"200px",marginTop:"50px" }}
              >
                <Typography className={classes.loginBtnText}>Change Subscription Plan</Typography>
              </Button>
            </Grid>
          </div>
        </div>
        {location.state.status === "pending" && (
          <Grid container spacing={2} marginTop={2} justifyContent="flex-end">
            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                className={classes.loginBtn}
                size="small"
                // onClick={handleLogin}
                disableRipple
                style={{ backgroundColor: "red" }}
              >
                <Typography className={classes.loginBtnText}>Reject</Typography>
              </Button>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                variant="contained"
                className={classes.loginBtn}
                size="small"
                // onClick={handleLogin}
                disableRipple
                style={{ backgroundColor: "green" }}
              >
                <Typography className={classes.loginBtnText}>Accept</Typography>
              </Button>
            </Grid>
          </Grid>
        )}
      </Container>
    </NavigationDrawer>
  );
};

export default RestaurantDetail;
