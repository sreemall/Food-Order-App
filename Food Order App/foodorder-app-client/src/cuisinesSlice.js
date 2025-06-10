import { GET_ALL_CUISINES_API } from "./constants/backend";
import axios from "axios";

const CUISINE_LIST_REQUEST = 'CUISINE_LIST_REQUEST';
const CUISINE_LIST_SUCCESS = 'CUISINE_LIST_SUCCESS';
const CUISINE_LIST_FAILURE = 'CUISINE_LIST_FAILURE'

// export const CATEGORY_DETAILS_REQUEST = 'CATEGORY_DETAILS_REQUEST';
// export const CATEGORY_DETAILS_SUCCESS = 'CATEGORY_DETAILS_SUCCESS';
// export const CATEGORY_DETAILS_FAILURE = 'CATEGORY_DETAILS_FAILURE'
console.log ("999 cuisinesSlicke")

export const fetchCuisines = () => async (dispatch) => {

  dispatch({ type: CUISINE_LIST_REQUEST });
  const config = {
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
    },
  };
  await axios
    .get(GET_ALL_CUISINES_API, config)
    .then((res) => {
      if (res.status === 200) {
        console.log ("fetch cuisines", res.data.data);
        dispatch({
            type: CUISINE_LIST_SUCCESS,
            payload: res.data.data
        });
        sessionStorage.setItem("cuisines", res.data.data);
      }
      else {
        dispatch({
          type: CUISINE_LIST_FAILURE,
          error: "Unable to fetch cuisine data"
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: CUISINE_LIST_FAILURE,
        error: "Unable to fetch cuisine data" + error
      });
    })
}

export const cuisinesReducer = (state= {cuisinesInfo: {}}, action) => {
  switch (action.type) {
    case CUISINE_LIST_REQUEST:
      return ({loadingCuisines: true});
    case CUISINE_LIST_SUCCESS:
      return ({loadingCuisines: false, success: true, cuisines: action.payload});
    case CUISINE_LIST_FAILURE:
      return ({loadingCuisines: false, success: false, error: action.error});
    default:
      return state;
  }
}
