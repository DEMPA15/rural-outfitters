import { combineReducers } from 'redux';
import {GET_PRODUCT, GET_PRODUCTS, ADD_TO_BASKET} from '../Actions/constraints';
let lastProduct = JSON.parse(localStorage.getItem('lastProduct')) || {};

function basket (state = 0, action){
    switch(action.type){
        case ADD_TO_BASKET :
            if(action.payload){
                return state + 1
            }else{
                return state - 1
            }
        default:
            return state;
    }
}
function products (state =[], action){
	switch(action.type){
        case `${GET_PRODUCTS}_PENDING`:
            return state;
        case `${GET_PRODUCTS}_FULFILLED`:
            return state = action.payload.data;
        case `${GET_PRODUCTS}_REJECTED`:
            return [`It didn't work`];
        default:
            return state;
    }
}
function product  (state = lastProduct, action){
    switch(action.type){
        case GET_PRODUCT :
           return  state = action.payload
        default:
            return state;
    }
}

const rootReducer = combineReducers({basket, product, products});

export default rootReducer;



