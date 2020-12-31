import { ACTIONS } from "./actions";

const defaultState = {
  shopDetails: {},
  items: [],
  orders: [],
  orderedItems: {},
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
        items: action.payload,
        orderedItems: {}
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
    case ACTIONS.ADD_ITEMS: {
      return {
        ...state,
        orderedItems: action.payload
      };
    }
    case ACTIONS.REMOVE_ITEMS: {
      return {
        ...state,
        orderedItems: action.payload
      };
    }
    case ACTIONS.CLEAR_CART: {
      return {
        ...state,
        orderedItems: {}
      };
    }
    default:
      return state;
  }
};

export default AppReducer;
