import { useEffect, useState ,useRef} from "react";
import {
  Grid,
  TextField,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import NavigationDrawer from "../../../../components/navigationDrawer";
import profile from "../../../../assets/images/profile.png";
import useStyles from "../../../../globalStyles";
import ImageUploader from "../../../../components/imageUploader";
import { primaryColor } from "../../../../constants/colors";
import { getOrginizationById } from "../../../services/merchants";
import Loader from "../../../../components/loader";
import SnackbarAlert from "../../../../components/snackbar/SnackbarAlert";
import axios from "axios"

const Profile = () => {
  const classes = useStyles();
  const userData = JSON.parse(localStorage.getItem("user"));
  const [isLoading, setIsLoading] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(profile);
  const [restImage, setRestImage] = useState(profile);
  const [data, setData] = useState({});
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    // address: "",
    // deliveryCharges: "",
    // category: "",
    // reqCategory: "",
  });
  const [snackbarProps, setSnackbarProps] = useState({
    open: false,
    type: "",
    message: "",
  });

  const handleSnackbarVal = (open, type, message) => {
    setSnackbarProps({
      open,
      type,
      message,
    });
  };

  useEffect(() => {
    getResturantByProfile();
  }, []);


  const handleImage = async (e) => {
    setIsLoading(true);

    const form = new FormData();
    form.append("image", e.target.files[0]);
    try {
      // let res = await axios.post("https://amberstore.pk/upload.php", form);
      let res = await axios.post("https://pizzafollia.com/upload.php", form);
      if (res) {
        setIsLoading(false);
        setRestImage(res.data.url);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  // console.log(data,"datatttatatt==========");
  const imageRef = useRef();
  useEffect(() => {
    const {
      email,
    //   address,
      name,
      phoneNumber,
      orginizationImage,
    //   deliveryCharges,
    //   logoImage,
    //   RequestedCategory,
    //   category,
    } = data;
    setInputValue({
      email,
    //   address,
      name,
      phoneNumber,
      deliveryCharges,
    //   reqCategory: RequestedCategory,
    //   category,
    });
    setImage(orginizationImage);
  }, [data]);

  const handleChangeValue = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const getResturantByProfile = () => {
    setIsLoading(true);
    getOrginizationById(userData._id)
      .then((response) => {
        console.log(response.data, "resssssss");
        let data = response?.data?.data;
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error, "errrrrr");
        setIsLoading(false);
      });
  };


  console.log(userData,"userData======>");
  const handleUpdate = () => {
    const {
      name,
      email,
    //   address,
      phoneNumber,
    //   deliveryCharges,
    //   category,
    //   reqCategory,
    } = inputValue;
    let payload = {
      name,
      address,
      orginizationImage:image,
    //   logoImage:restImage,
      phoneNumber,
    //   deliveryCharges: parseInt(deliveryCharges),
    //   RequestedCategory: reqCategory,
    //   category,
    };
    if (
      name === "" ||
      phoneNumber === "" ||
      email == ""
    ) {
      handleSnackbarVal(true, "error", "All fields are required");
    } else {
      setIsLoading(true);
      editResturantProfile(userData._id, payload)
        .then((res) => {
          setIsLoading(false);
          console.log(res.data.data);
          handleSnackbarVal(true, "success", res.data.message);
        })
        .catch((error) => {
          console.log(error, "Error");
          setIsLoading(false);
          handleSnackbarVal(true, "error", error?.response?.data?.message);
        });
    }
  };

//   useEffect(() => {
//     setIsLoading(true);
//     getAdminCategories()
//       .then((res) => {
//         console.log(res, "salkdjsaldkj");
//         setCategories(res.data.data);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         console.log(err, "aslkdsjlajdlk");
//         setIsLoading(false);
//       });
//   }, []);

  const handleCloseSnackbar = () => {
    handleSnackbarVal(false, "", "");
  };

  return (
    <NavigationDrawer>
      <Loader isloading={isLoading} />
      <SnackbarAlert
        snackbarProps={snackbarProps}
        handleCloseSnackbar={handleCloseSnackbar}
      />
      <Grid container justifyContent="center">
        <Grid item xs={6}>
          <div
            style={{
              boxShadow: "0 0.2rem 1rem rgb(0 0 0 / 12%)",
              padding: "10px",
            }}
          >
            <div className={classes.paper}>
              <Typography style={{ fontSize: "25px", fontWeight: "600" }}>
                Profile
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} marginTop="12px">
                  <div>
                    <ImageUploader
                      type="profile"
                      image={image}
                      setImage={setImage}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={12} marginTop="12px">
                  <div>
                  {orginizationImage ? (
                <img
                  src={
                    orginizationImage
                      ? orginizationImage
                      : ""
                  }
                  onClick={() => imageRef.current.click()}
                  style={{
                    cursor: "pointer",
                    height: 150,
                    width: "100%",
                  }}
                />
              ) : (
                <img
                  src={""}
                  onClick={() => imageRef.current.click()}
                  style={{
                    cursor: "pointer",
                    height: 150,
                  }}
                />
              )}
              <input
                type="file"
                style={{ height: 0, width: 0, visibility: "hidden" }}
                ref={imageRef}
                onChange={handleImage}
              />
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="name"
                    placeholder="Name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    autoFocus
                    className={classes.globalInput}
                    onChange={handleChangeValue}
                    value={inputValue.name}
                    onKeyPress={(e) =>
                      e.key == "Enter" ? handleUpdate() : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="email"
                    placeholder="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    autoFocus
                    className={classes.globalInput}
                    value={inputValue.email}
                    onChange={handleChangeValue}
                    onKeyPress={(e) =>
                      e.key == "Enter" ? handleUpdate() : null
                    }
                    disabled
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    type="number"
                    id="phoneNumber"
                    className={classes.globalInput}
                    value={inputValue.phoneNumber}
                    onChange={handleChangeValue}
                    onKeyPress={(e) =>
                      e.key == "Enter" ? inputValue.phoneNumber : null
                    }
                  />
                </Grid>
                {/* <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    variant="outlined"
                    placeholder="Delivery Charges"
                    margin="normal"
                    name="deliveryCharges"
                    className={classes.globalInput}
                    value={inputValue.deliveryCharges}
                    onChange={handleChangeValue}
                    type={"number"}
                  />
                </Grid> */}
                {/* <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    name="address"
                    placeholder="Address"
                    type="text"
                    id="address"
                    className={classes.globalInput}
                    value={inputValue.address}
                    onChange={handleChangeValue}
                    onKeyPress={(e) =>
                      e.key == "Enter" ? handleUpdate() : null
                    }
                  />
                </Grid> */}
                {/* <Grid
                  alignSelf="center"
                  style={{ height: "41px" }}
                  item
                  xs={12}
                  sm={12}
                  md={6}
                >
                  <select
                    value={inputValue.category}
                    onChange={(e) => {
                      if (e.target.value == "Other") {
                        setShowCategory(true);
                        setInputValue({ ...inputValue, category: "" });
                      } else {
                        setShowCategory(false);
                        setInputValue({
                          ...inputValue,
                          category: e.target.value,
                          reqCategory: "",
                        });
                      }
                    }}
                    name="category"
                    className="select-option-style"
                  >
                    <option value="">Select Category</option>
                    {categories.map((item) => {
                      return (
                        <>
                          <option
                            value={item.name}
                            style={{ fontSize: "12px" }}
                          >
                            {item.name}
                          </option>
                        </>
                      );
                    })}
                    <option value="Other" style={{ fontSize: "12px" }}>
                      Other
                    </option>
                  </select>
                </Grid>
                {showCategory ? (
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      id="name"
                      placeholder="Request Category"
                      name="reqCategory"
                      type="text"
                      className={classes.globalInput}
                      onChange={(e) =>
                        setInputValue({
                          ...inputValue,
                          reqCategory: e.target.value,
                        })
                      }
                      value={inputValue.reqCategory}
                    />
                  </Grid>
                ) : null} */}
              </Grid>

              <div style={{ textAlign: "center", width: "100%" }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handleUpdate}
                  disableRipple
                  style={{
                    width: "22%",
                    backgroundColor: primaryColor,
                    textTransform: "none",
                    marginTop: "10px",
                  }}
                >
                  <Typography style={{ fontSize: "13px" }}>
                    Update Profile
                  </Typography>
                </Button>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </NavigationDrawer>
  );
};

export default Profile;
