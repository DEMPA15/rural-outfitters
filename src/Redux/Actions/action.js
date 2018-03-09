import {GET_PRODUCT, GET_PRODUCTS, ADD_TO_BASKET} from '../Actions/constraints';
import axios from 'axios'

export function AddToBasket(bool){
    return {
        type: ADD_TO_BASKET,
        payload: bool
    }
}
export function GetProducts(){
   const payload = axios.get('/api/items');
    return {
        type: GET_PRODUCTS,
        payload
    }
}
export function GetProduct(item){
    localStorage.setItem("lastProduct", JSON.stringify(item));
    return {
        type: GET_PRODUCT,
        payload: item
    }
}
