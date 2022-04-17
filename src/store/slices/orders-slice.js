import { createSlice } from '@reduxjs/toolkit';
import {
  fetchOrders,
  markOrderAsProcessedAction,
} from '../actions/orders-actions';

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    processedOrders: [],
    unprocessedOrders: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      let processedOrders = [];
      let unprocessedOrders = [];
      if (action.payload) {
        for (let item in action.payload) {
          for (let property in action.payload[item]) {
            let order = action.payload[item][property];
            if (order.orderProcessed) {
              processedOrders.push({ ...order, orderKey: property });
            } else {
              unprocessedOrders.push({ ...order, orderKey: property });
            }
          }
        }
      }
      state.processedOrders = processedOrders;
      state.unprocessedOrders = unprocessedOrders;
    });
    builder.addCase(markOrderAsProcessedAction.fulfilled, (state, action) => {
      state.unprocessedOrders = state.unprocessedOrders.filter(
        (item) => item.orderKey !== action.payload.orderKey
      );
      state.processedOrders.push(action.payload);
    });
  },
});

export const ordersSliceActions = ordersSlice.actions;
export default ordersSlice;
