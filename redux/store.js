import { createStore, combineReducers, applyMiddleware } from "redux";
import AppReducer from "./reducer";
import thunk from "redux-thunk";

export default function configureStore() {
  const rootReducer = combineReducers({ appStore: AppReducer });
  return createStore(rootReducer, applyMiddleware(thunk));
}
