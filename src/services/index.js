import axios from "axios";
// let baseUrl = "http://192.168.1.108:5000/api/";
//  let baseUrl = "https://server-portal-phi.vercel.app/api/"
 let baseUrl = "https://final-bhs-server.vercel.app/api/"
// let baseUrl = "https://prickly-hen-poncho.cyclic.app/api/"
// let baseUrl = "https://web-production-ab509.up.railway.app/api/"

const api = async (path, params, method) => {
  let options;
  options = {
    headers: {
      "Content-Type": "application/json",

    },
    method: method,
    ...(params && { data: JSON.stringify(params) }),
  };
  console.log("options", options);
  return axios(baseUrl + path, options)
    .then((response) => {
      return response;
    })
    .catch(async (error) => {
      return error.response;
    });
};

export default api;
