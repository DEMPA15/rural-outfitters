import {GET_PRODUCT, GET_PRODUCTS, ADD_TO_BASKET, DELETE_FROM_BASKET} from '../Actions/constraints';
import axios from 'axios'

export function addToBasket(userId, productId){
    const payload = axios.post(`/api/basket`, { userId, productId })
        .then(({ data }) => data)
    return {
        type: ADD_TO_BASKET,
        payload
    }
}

export function deleteFromBasket(userId, productId){
    const payload = axios.delete(`/api/basket`, { userId, productId })
        .then(({ data }) => data)
    return {
        type: DELETE_FROM_BASKET,
        payload
    }
}


export function getProducts(){
   const payload = axios.get('/api/items');
    return {
        type: GET_PRODUCTS,
        payload
    }
}
export function getProduct(item){
    localStorage.setItem("lastProduct", JSON.stringify(item));
    return {
        type: GET_PRODUCT,
        payload: item
    }
}
