import { ACTIONS } from "./actions";

const defaultState = {
  shopDetails: {},
  items: [],
  orders: [],
  dataLoading: false
};

const AppReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.GET_SHOP_DETAILS: {
      return {
        ...state,
        shopDetails: action.payload
      };
    }
    case ACTIONS.GET_ITEMS_LIST: {
      return {
        ...state,
        items: action.payload
      };
    }
    case ACTIONS.GET_ORDER_LIST: {
      return {
        ...state,
        orders: action.payload
      };
    }
    case ACTIONS.DATA_LOADING: {
      return {
        ...state,
        dataLoading: action.payload
      };
    }
    default:
      return state;
  }
};

export default AppReducer;
