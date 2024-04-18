import { useState, useEffect } from "react";
import { Grid, TextField, Typography, Button, Container } from "@mui/material";
import DynamicTable from "../../../components/dynamicTable";
import NavigationDrawer from "../../../components/navigationDrawer";
import merchantStyle from "./style";
import {
 getAllDrivers,
 getAllUsers,
 updateDriverStatus
} from "../../../services/users";
import Loader from "../../../components/loader";
import SnackbarAlert from "../../../components/snackbar/SnackbarAlert";
import { getAllOrginization } from "../../../services/organization";

const headerData = [
  {
    id: "id",
    numeric: false,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: true,
    label: "Email",
  },
  {
    id: "phoneNumber",
    numeric: false,
    disablePadding: true,
    label: "Phone Number",
  },
  {
    id: "userImage",
    numeric: false,
    disablePadding: true,
    label: "Image",
  },
];

const diplayRows = ["id", "name","email","phoneNumber","userImage",];

const Merchants = () => {
  const classes = merchantStyle();
  const user = JSON.parse(localStorage.getItem("user"));
  const [type, setType] = useState("add");
  const [openDialog, setOpenDialog] = useState(false);
  const [rowsData, setRowsData] = useState([]);
  const [dialogData, setDialgData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarProps, setSnackbarProps] = useState({
    open: false,
    type: "",
    message: "",
  });

  const [inputValue, setInputValue] = useState({
    name: "",
  });

  const handleSnackbarVal = (open, type, message) => {
    setSnackbarProps({
      open,
      type,
      message,
    });
  };

  const handlegetAllMerchants = () => {
    setIsLoading(true);
    getAllUsers()
      .then((res) => {
        console.log(res, "ressssss");
        // let data = res.data.data.reverse();
        setIsLoading(false);
        setRowsData(res?.data?.data);
        console.log(res?.data?.data?.merchantImage,"iiiuuiiuiiiuu");
      })
      .catch((err) => {
        console.log(err, "errr");
        setIsLoading(false);
      });
  };

  console.log(rowsData,"rowsDatarowsDatarowsData");

  useEffect(() => {
    handlegetAllMerchants();
  }, []);

  const openAddDialog = () => {
    setOpenDialog(true);
    setType("add");
  };

  const openEditDialog = (row) => {
    setOpenDialog(true);
    setDialgData(row);
    setType("edit");
  };


  // const handleEditStatus = (e, row, type) => {
  //   e.stopPropagation();
  //   setIsLoading(true);
  //   let featureParam = {
  //     isFeatured: !row.isFeatured,
  //     restId: row._id,
  //   };
  //   let approveParam = {
  //     isApprove: !row.isApprove,
  //     restId: row._id,
  //   };

  //   if (type == "feature")
  //     updateRestStatus(featureParam)
  //       .then((res) => {
  //         getData();
  //         handleSnackbarVal(true, "success", res?.data?.message);
  //         setIsLoading(false);
  //       })
  //       .catch((err) => {
  //         setIsLoading(false);
  //         handleSnackbarVal(true, "error", err?.response?.data?.message);
  //       });
  //   else
  //     updateRestStatus(approveParam)
  //       .then((res) => {
  //         handleSnackbarVal(true, "success", res?.data?.message);
  //         setIsLoading(false);
  //         getData();
  //       })
  //       .catch((err) => {
  //         setIsLoading(false);
  //         handleSnackbarVal(true, "error", err?.response?.data?.message);
  //       });
  // };

  // const handleClose = () => {
  //   setOpenDialog(false);
  //   setInputValue({
  //     name: "",
  //     email: "",
  //     phoneNumber: "",
  //     address: "",
  //   });
  //   setImage("");
  //   setCategory("");
  // };

  // const handleDelete = (val) => {};

  // const navigateToDetail = (row) => {
  //   navigate(`/restaurantDetail/${row.orderId}`, {
  //     state: row,
  //   });
  // };



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
      <Container>
        <Grid container alignItems="center">
          <Grid item xs={12} md={2}>
            <Typography style={{ fontSize: "22px", fontWeight: "600" }}>
              Users
            </Typography>
          </Grid>
        </Grid>
        {/* <div style={{ textAlign: "right", margin: "10px 0" }}>
          <TextField placeholder="Search" size="small" />
          <Button
            variant="contained"
            size="small"
            disableRipple
            className={classes.loginBtn}
            onClick={openAddDialog}
          >
            <Typography className={classes.loginBtnText}>Add New</Typography>
          </Button>
        </div> */}

        {/* >> Table */}
        <DynamicTable
          headerData={headerData}
          bodyRows={rowsData}
          displayData={diplayRows}
        />
      </Container>
    </NavigationDrawer>
  );
};

export default Merchants;
