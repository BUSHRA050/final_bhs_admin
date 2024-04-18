import { useState, useEffect } from "react";
import { Grid, TextField, Typography, Button, Container } from "@mui/material";
import DynamicTable from "../../../components/dynamicTable";
import NavigationDrawer from "../../../components/navigationDrawer";
import merchantStyle from "./style";
import { getAllOrginization } from "../../../services/organization/index";
import Loader from "../../../components/loader";
import SnackbarAlert from "../../../components/snackbar/SnackbarAlert";
import {updateOrginizationStatus} from "../../../services/organization/index"
import { useNavigate } from "react-router-dom";

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
    id: "orginizationImage",
    numeric: false,
    disablePadding: true,
    label: "Image",
  },
  {
    id: "plan",
    numeric: false,
    disablePadding: true,
    label: "Active Plan",
  },
  {
    id: "planStartDate",
    numeric: false,
    disablePadding: true,
    label: "Plan Start Date",
  },
  {
    id: "planEndDate",
    numeric: false,
    disablePadding: true,
    label: "Plan End Date",
  },
  {
    id: "approve",
    numeric: true,
    disablePadding: false,
    label: "Approve",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: true,
    label: "View",
  },
];

const diplayRows = ["id", "name","email","orginizationImage","plan","planStartDate","planEndDate","approve","actions"];

const Orginization = () => {
  const classes = merchantStyle();
  const navigate = useNavigate();
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

  
  const handleSnackbarVal = (open, type, message) => {
    setSnackbarProps({
      open,
      type,
      message,
    });
  };

  const handlegetAllMerchants = () => {
    setIsLoading(true);
    getAllOrginization()
      .then((res) => {
        console.log(res?.data?.data, "ressssss");
        // let data = res.data.data.reverse();
        setIsLoading(false);
        setRowsData(res?.data?.data);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };


  useEffect(() => {
    handlegetAllMerchants();
  }, []);

  


  const handleUpdateMerchantStatus = (e,row, type) => {
    let payload = {
      isApprove: !row.isApprove,
    };
    console.log(row._id,"rowrowrowrowrowrowrow");
    console.log(payload,"payloadpayloadpayload");
      setIsLoading(true);
      updateOrginizationStatus(row?._id,payload)
        .then((res) => {
          handlegetAllMerchants();
          setIsLoading(false);
          handleSnackbarVal(true, "success", res?.data?.message);
        })
        .catch((err) => {
          setIsLoading(false);
          handleSnackbarVal(true, "error", err?.response?.data?.message);
        });
  };




  const handleCloseSnackbar = () => {
    handleSnackbarVal(false, "", "");
  };

  const navigateToDetail = (row) => {
    navigate(`/orginizationDetail/${row._id}`, {
      state: row,
    });
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
              Organizations
            </Typography>
          </Grid>
        </Grid>
        {/* >> Table */}
        <DynamicTable
          headerData={headerData}
          bodyRows={rowsData}
          displayData={diplayRows}
          handleEditStatus={handleUpdateMerchantStatus}
          showView={true}
          navigateToDetail={navigateToDetail}
          showSwitch={true}
        />
      </Container>
    </NavigationDrawer>
  );
};

export default Orginization;
