import React from "react";
import { nativeViewProps } from "react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler";
import { CREATE_ORDER, REMOVE_ORDER, SET_ALL_ORDERS } from "../actions/order";
const initialState = {
    currentOrder: [],
    amount: 0,
    orders: []
}

export default (state = { ...initialState }, { type, payload }) => {
    switch (type) {

        case CREATE_ORDER:
            // console.log(payload);
            state.currentOrder = payload.orders;
            state.amount = payload.amount;
            state.orders.push({
                date: Date.now(),
                status: '1', //New
                orderDetail: payload.orders,
            });

            return { ...state }
        case REMOVE_ORDER:
            return { ...state }
        case SET_ALL_ORDERS:
            state.orders = payload;
            return { ...state };

        default:
            return state
    }
}
