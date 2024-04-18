import Api from "../index";
import { endPoints, requestType } from "../../constants/variables";


export const getAllOrginization = () => {
    return Api(`${endPoints.getAllOrginization}`, null, requestType.GET);
  };
  
export const updateOrginizationStatus = (id,params) => {
    return Api(`${endPoints.updateOrginizationStatus}/${id}`, params, requestType.PUT);
};

export const getOrginizationById = (id) => {
  return Api(`${endPoints.getOrginizationById}/${id}`, null, requestType.GET);
};

export const getSubscriptionPlanById = (id) => {
  return Api(`${endPoints.getSubscriptionPlanById}/${id}`, null, requestType.GET);
}