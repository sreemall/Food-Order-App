import {GET_ALL_RESTAURANTS_API} from "./constants/backend";
import axios from "axios";

const RESTAURANT_LIST_REQUEST = 'RESTAURANT_LIST_REQUEST';
const RESTAURANT_LIST_SUCCESS = 'RESTAURANT_LIST_SUCCESS';
const RESTAURANT_LIST_FAILURE = 'RESTAURANT_LIST_FAILURE'


export const fetchRestaurants = () => async (dispatch) => {
    dispatch ({type: RESTAURANT_LIST_REQUEST});
    const config = {headers: {"Content-Type": "application/json"}};
    await axios.get (GET_ALL_RESTAURANTS_API, config)
            .then ((res) => {
                if (res.status === 200) {
                    dispatch ({type:RESTAURANT_LIST_SUCCESS, payload: res.data.data});
                    sessionStorage.setItem ("restaurants", res.data.data);
                }
                else {
                    dispatch ({type:RESTAURANT_LIST_FAILURE, error: "Unable to fetch Restaurant data"});
                }
            })
            .catch ((error) => {
                dispatch ({type:RESTAURANT_LIST_FAILURE, error: "Unable to fetch Restaurant data"+error});
            });
};

export const restaurantsReducer = (state={restaurantsInfo: {}}, action) => {
    switch (action.type) {
        case RESTAURANT_LIST_REQUEST:
            return {loadingRestaurants: true};
        case RESTAURANT_LIST_SUCCESS:
            return {loadingRestaurants: false, success: true, restaurants: action.payload};
        case RESTAURANT_LIST_FAILURE:
            return {loadingRestaurants: false, success: false, error: action.error};
        default:
            return state;
    }
};