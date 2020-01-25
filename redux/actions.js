import { invokeApi } from "../services/dataServices";
import { SHOP_ENDPOINTS, DOMAIN_NAME } from "../constants/endpoints";

export const ACTIONS = {
  GET_SHOP_DETAILS: "getShopDetails"
};

export const getShopdetails = () => dispatch => {
  invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.GETSHOP}`, "GET")
    .then(data => {
      // console.log("response wqeq askjsha", data);
      if (data && data.data) {
        dispatch({ type: ACTIONS.GET_SHOP_DETAILS, payload: data.data || {} });
      }
    })
    .catch(err => {
      console.log(err);
    });
};
