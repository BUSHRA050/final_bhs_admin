import Api from "../index";
import { endPoints, requestType } from "../../constants/variables";


// Login api

export const adminLogin = (params) => {
    return Api(endPoints.loginAdmin, params, requestType.POST);
  };
export const adminDashboard = () => {
    return Api(endPoints.adminDashboard, null, requestType.GET);
  };