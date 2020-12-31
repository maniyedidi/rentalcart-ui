import { invokeApi } from "../services/dataServices";
import { SHOP_ENDPOINTS, DOMAIN_NAME } from "../constants/endpoints";

export const ACTIONS = {
  GET_ITEMS_LIST: "GET_ITEMS_LIST",
  GET_ORDER_LIST: "GET_ORDER_LIST",
  DATA_LOADING: "DATA_LOADING",
  ADD_ITEMS: "ADD_ITEMS",
  REMOVE_ITEMS: "REMOVE_ITEMS",
  CLEAR_CART: "CLEAR_CART"
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

export const addItems = (dispatch, data) => {
  dispatch({ type: ACTIONS.ADD_ITEMS, payload: data || false });
};

export const removeItems = (dispatch, data) => {
  dispatch({ type: ACTIONS.REMOVE_ITEMS, payload: data || false });
};

export const clearItems = (dispatch, flag) => {
  dispatch({ type: ACTIONS.CLEAR_CART, payload: flag || false });
};
