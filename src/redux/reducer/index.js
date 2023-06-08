import { combineReducers } from "@reduxjs/toolkit";
import postReducers from "./postReducers";
import authReducer from "./authReducer";

export default combineReducers({
  post: postReducers,
  auth: authReducer,
});
