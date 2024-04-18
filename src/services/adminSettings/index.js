import Api from "../index";
import { endPoints, requestType } from "../../constants/variables";

export const adminChangePass = (params) => {
  return Api(`${endPoints.changePasswordAdmin}`, params, requestType.POST);
};

export const getCertificationLink = () => {
  return Api(`${endPoints.getCertificationLink}`, null, requestType.GET);
};
export const updateCertificationLink = (id, params) => {
  return Api(
    `${endPoints.updateCertificationLink}/${id}`,
    params,
    requestType.PUT
  );
};

export const createCertificationLink = (params) => {
  return Api(endPoints.createCertificationLink, params, requestType.POST);
};

export const createPerKmCharges = (params) => {
  return Api(endPoints.createPerKmCharges, params, requestType.POST);
};

export const getPerKmCharges = () => {
  return Api(`${endPoints.getPerKmCharges}`, null, requestType.GET);
};

export const upadtePerKmCharges = (id, params) => {
  return Api(`${endPoints.upadtePerKmCharges}/${id}`, params, requestType.PUT);
};

export const getSupportMessages = (data) => {
  console.log(data, "kdlkdllddk");
  return Api(`${endPoints.getSupportMessages}?type=${data}`, null, requestType.GET);
};

export const upadteSupportStatus = (id, params) => {
  return Api(`${endPoints.upadteSupportStatus}/${id}`, params, requestType.PUT);
};

