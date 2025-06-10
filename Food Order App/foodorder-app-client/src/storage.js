import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
// import { composeWithDevTools } from "@redux-devtools/extension";
import {userLoginReducer} from "./userLoginSlice";
import {userLogoutReducer} from "./userLoginSlice";
import {cuisinesReducer} from "./cuisinesSlice.js";
import { categoriesReducer } from "./categoriesSlice.js";
import { restaurantsReducer } from "./restaurantsSlice.js";

// console.log ("999 after imports Storage");

// const middleware = [thunk];
const reducer = combineReducers ({login: userLoginReducer, logout: userLogoutReducer,
          cuisinesInfo: cuisinesReducer,
          categoriesInfo: categoriesReducer,
          restaurantsInfo: restaurantsReducer});
const store = createStore(
  reducer,
  applyMiddleware(thunk));
// console.log ("storage2 state=", store.getState());

// const store = createStore (userLoginReducer);

export default store;