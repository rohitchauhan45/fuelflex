// cartAction.js


import { ADD_TO_CART, BUY_NOW, REMOVE_ONE, REMOVE_ALL,QUANTITY }from "../type";

export const addToCart = (item) => ({
    type: ADD_TO_CART,
    payload: item,
});

export const buyNow = () => ({
    type: BUY_NOW,
});

export const removeOne = (id) => ({
    type: REMOVE_ONE,
    payload: id,
});

export const removeAll = () => ({
    type: REMOVE_ALL,
});

export const quantity=()=>({
    type:QUANTITY
})


