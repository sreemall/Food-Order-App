import {GET_ALL_CATEGORIES_API} from "./constants/backend";
import axios from "axios";

const CATEGORY_LIST_REQUEST = 'CATEGORY_LIST_REQUEST';
const CATEGORY_LIST_SUCCESS = 'CATEGORY_LIST_SUCCESS';
const CATEGORY_LIST_FAILURE = 'CATEGORY_LIST_FAILURE'

export const fetchCategories = () => async (dispatch) => {
    dispatch ({type: CATEGORY_LIST_REQUEST});
    const config = {
        headers: {
          "Content-Type": "application/json",
          // "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH",
        },
      };

    await axios
        .get (GET_ALL_CATEGORIES_API, config)
        .then ((res) => {
            if (res.status === 200) {
                console.log ("fetch categories", res.data.data);
                dispatch ({type: CATEGORY_LIST_SUCCESS, payload: res.data.data});
                sessionStorage.setItem ("categories", res.data.data);
            }
            else
                dispatch ({type:CATEGORY_LIST_FAILURE, error: "Unable to fetch categories"});
        })
        .catch (error => {
            dispatch ({type:CATEGORY_LIST_FAILURE, error: "Unable to fetch categories" + error});
        });
};

export const categoriesReducer = (state = {categoriesInfo: {}}, action) => {
    switch (action.type) {
        case CATEGORY_LIST_REQUEST:
            return ({loadingCategories: true});
        case CATEGORY_LIST_SUCCESS:
            return ({loadingCategories: false, success: true, categories: action.payload});
        case CATEGORY_LIST_FAILURE:
            return ({loadingCategories: false, success: false, error: action.error});
        default:
            return state;

    }
}

