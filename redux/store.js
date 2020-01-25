import { createStore, combineReducers, applyMiddleware } from "redux";
import SpidlePOS from "./reducer";
import thunk from "redux-thunk";

export default function configureStore() {
  const rootReducer = combineReducers({ spidlepos: SpidlePOS });
  return createStore(rootReducer, applyMiddleware(thunk));
}
