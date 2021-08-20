export const getOrdersSelector = (state) => state.orderReducer.currentOrder;
export const getOrderAmountSelector = (state) => state.orderReducer.amount;
export const getAllOrdersSelector = (state) => state.orderReducer.orders;