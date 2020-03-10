import { invokeApi } from "../services/dataServices";
import { SHOP_ENDPOINTS, DOMAIN_NAME } from "../constants/endpoints";

export const ACTIONS = {
  GET_ITEMS_LIST: "GET_ITEMS_LIST",
  DATA_LOADING: "DATA_LOADING"
};

export const getItems = dispatch => {
  invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.ITEMS}`, "GET")
    .then(data => {
      if (data.error) {
        dispatch({ type: ACTIONS.GET_ITEMS_LIST, payload: [] || {} });
      } else {
        dispatch({ type: ACTIONS.GET_ITEMS_LIST, payload: data || {} });
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: ACTIONS.GET_ITEMS_LIST, payload: [] || {} });
    });
};
