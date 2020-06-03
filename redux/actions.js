import { invokeApi } from "../services/dataServices";
import { SHOP_ENDPOINTS, DOMAIN_NAME } from "../constants/endpoints";

export const ACTIONS = {
  GET_ITEMS_LIST: "GET_ITEMS_LIST",
  GET_ORDER_LIST: "GET_ORDER_LIST",
  DATA_LOADING: "DATA_LOADING"
};

export const getItems = dispatch => {
  dataLoading(dispatch, true);
  invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.ITEMS}`, "GET")
    .then(data => {
      if (data.error) {
        dispatch({ type: ACTIONS.GET_ITEMS_LIST, payload: [] || {} });
      } else {        
        dispatch({ type: ACTIONS.GET_ITEMS_LIST, payload: data || {} });
      }
      dataLoading(dispatch, false);
    })
    .catch(err => {
      console.log(err);
      dataLoading(dispatch, false);
      dispatch({ type: ACTIONS.GET_ITEMS_LIST, payload: [] || {} });
    });
};

export const getOrders = dispatch => {
  dataLoading(dispatch, true);
  invokeApi(`${DOMAIN_NAME}${SHOP_ENDPOINTS.ORDERS}`, "GET")
    .then(data => {
      if (data.error) {
        dispatch({ type: ACTIONS.GET_ORDER_LIST, payload: [] || {} });
      } else {
        dispatch({ type: ACTIONS.GET_ORDER_LIST, payload: data || {} });
      }
      dataLoading(dispatch, false);
    })
    .catch(() => {
      dataLoading(dispatch, false);
      dispatch({ type: ACTIONS.GET_ORDER_LIST, payload: [] || {} });
    });
};

export const dataLoading = (dispatch, loading) => {
  dispatch({ type: ACTIONS.DATA_LOADING, payload: loading || false });
};
