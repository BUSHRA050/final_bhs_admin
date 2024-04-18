import Api from "../index";
import { endPoints, requestType } from "../../constants/variables";


export const getAllUsers = () => {
    return Api(`${endPoints.getAllUsers}`, null, requestType.GET);
  };
  
  export const updateDriverStatus = (params) => {
    return Api(endPoints.updateDriverStatus, params, requestType.PUT);
};