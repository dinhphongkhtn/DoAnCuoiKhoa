import React from "react";
import { DECREASE_QUANTITY, INCREASE_QUANTITY, PUSH_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, CLEAR_ALL_ITEMS } from "../actions/cart.js";
const initialState = {
    items: [],
    amount: 0
}

const caculateAmount = () => {
    const _amount = 0;

}

export default (state = { ...initialState }, { type, payload }) => {
    switch (type) {

        case PUSH_ITEM_TO_CART:

            const currentItem = state.items.find(a => a.id === payload.id);

            if (currentItem !== undefined) {
                currentItem.quantity = currentItem.quantity + 1;
                currentItem.amount = currentItem.price * currentItem.quantity;
            }
            else {
                payload.quantity = 1;
                payload.amount = payload.price * payload.quantity;
                state.items.push(payload);
            }

            state.amount = state.items.map((item) => { return item.quantity * item.price }).reduce((a, b) => a + b, 0)  //state.amount+payload.price;
            state.items = [...state.items];

            return { ...state }
        case REMOVE_ITEM_FROM_CART:
            const currentItemIndex = state.items.findIndex(a => a.id === payload);
            if (currentItemIndex > 0) {
                state.items.splice(currentItemIndex, 1);
            }
            // state.amount  = state.amount - currentItemIndex.price;
            state.amount = state.items.map((item) => { return item.quantity * item.price }).reduce((a, b) => a + b, 0)
            state.items = [...state.items]

            return { ...state }
        case INCREASE_QUANTITY:
            const increaseItem = state.items.find(a => a.id === payload);
            if (increaseItem !== undefined) {
                increaseItem.quantity = increaseItem.quantity + 1;
            }
            state.amount = state.amount + increaseItem.price;
            increaseItem.amount = increaseItem.price * increaseItem.quantity;
            state.items = [...state.items]
            return { ...state }
        case DECREASE_QUANTITY:
            const decreaseItem = state.items.find(a => a.id === payload);
            if (decreaseItem !== undefined && decreaseItem.quantity > 0) {
                decreaseItem.quantity = decreaseItem.quantity - 1;
            }
            state.amount = state.amount - decreaseItem.price;
            decreaseItem.amount = decreaseItem.price * decreaseItem.quantity;
            state.items = [...state.items]

            return { ...state }
        case CLEAR_ALL_ITEMS:
            state.items.splice(0, state.items.length);
            state.amount = 0;
            state.items = [...state.items];
            return { ...state };
        default:
            return state
    }
}
