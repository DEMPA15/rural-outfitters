import {GET_PRODUCT, GET_PRODUCTS, ADD_TO_BASKET} from '../Actions/constraints';
import axios from 'axios'

export function AddToBasket(bool){
    return {
        type: ADD_TO_BASKET,
        payload: bool
    }
}
export function GetProducts(){
   const payload = axios.get('/api/getProducts');
    return {
        type: ADD_TO_BASKET,
        payload
    }
}
export function GetProduct(item){
    return {
        type: ADD_TO_BASKET,
        payload: item
    }
}
