import axios from "axios";
import {LOGIN_API} from "./constants/backend";

const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILURE = "LOGIN_FAILURE";

const LOGOUT_REQUEST = "LOGOUT_REQUEST";
const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
const LOGOUT_FAILURE = "LOGOUT_FAILURE";

// const BACKEND_URL_ENDPOINT = "https://foodorder-api-elti.onrender.com/v1/";
// const BACKEND_URL_ENDPOINT = "http://localhost:8080/api/v1/";
// const LOGIN_API = BACKEND_URL_ENDPOINT + "users/login";

console.log ("999 userLoginSlice")

export function userLoginReducer (state = {}, action) {
    switch (action.type) {
      case LOGIN_REQUEST:
        return { loading: true };
      case LOGIN_SUCCESS:
        console.log("In userLoginReducer LoginSuccess action.payload", action.payload);
        return {
          loading: false,
          success: action.success,
          userInfo: action.payload,
        };
      case LOGIN_FAILURE:
        console.log(action.payload);
        return { loading: false, error: action.error };
      default:
        return state;
    }
};


export const login = (username, password) => async (dispatch, state) => {
    console.log ("login", state);
    try {
      dispatch({
        type: LOGIN_REQUEST,
      });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
        },
      };
  console.log ("LOGIN_API=", LOGIN_API);
      await axios
        .post(LOGIN_API, { username, password }, config)
        .then((res) => {
          if (res.status === 200) {
            console.log("In userActions.js Login_success res=", res);
            dispatch({
              type: LOGIN_SUCCESS,
              payload: res.data.data,
              success: 'Login successful',
            });
            sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
            console.log ("after login dipatch state=", state, sessionStorage.getItem ("userInfo"));
          } else {
            console.log("In userActions.js Login_Failure res=", res);
            dispatch({
              type: LOGIN_FAILURE,
              error: 'Unable to Login',
            });
          }
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: LOGIN_FAILURE,
            error: 'Unable to Login',
          });
        });
  
      // console.log(response);
      // dispatch({ type: LOGIN_SUCCESS, payload: response, message: response });
      // localStorage.setItem("userInfo", JSON.stringify(response));
    } catch (err) {
      console.log(err);
      dispatch({
        type: LOGIN_FAILURE,
        payload: err.message,
      });
    }
  };


  export const userLogoutReducer = (state = {}, action) => {
    switch (action.type) {
      case LOGOUT_REQUEST:
        return { loading: true };
      case LOGOUT_SUCCESS:
        return { loading: false, success: true};
      case LOGOUT_FAILURE:
        return { loading: false, error: action.error };
      default:
        return state;
    }
  };


  export const logout = () => (dispatch) => {
    try {
      dispatch ({type: LOGOUT_REQUEST});
      dispatch ({type: LOGOUT_SUCCESS, payload: "Successfully logged out"});
      sessionStorage.removeItem ("userInfo");
      window.location.replace ("/");
    }
    catch (error) {
      dispatch ({type: LOGOUT_FAILURE, payload: error.message});
    }
  };