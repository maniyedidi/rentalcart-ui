import { ACTIONS } from "./actions";

const defaultState = {
  shopDetails: {}
};

const SpidlePOS = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.GET_SHOP_DETAILS: {
      return {
        ...state,
        shopDetails: action.payload
      };
    }
    default:
      return state;
  }
};

export default SpidlePOS;
