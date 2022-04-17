import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosAuthenticatedRequests from '../../Shared/AxiosConfig/axios-auth-req';
import { cartActions } from '../slices/cart-slice';
import { uiSliceActions } from '../slices/ui-slice';
import { storeCartData } from './cart-actions';

export const storeOrder = createAsyncThunk(
  'store/order',
  async (data, thunkApi) => {
    thunkApi.dispatch(uiSliceActions.showSpinner());
    try {
      const response = await AxiosAuthenticatedRequests.post(
        `orders/${data.userId}.json`,
        { ...data, orderProcessed: false }
      );
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      if (response.status === 200) {
        thunkApi.dispatch(cartActions.clearCart());
        thunkApi.dispatch(
          storeCartData({
            totalItems: thunkApi.getState().cart.totalItems,
            itemsInCart: thunkApi.getState().cart.itemsInCart,
            totalPrice: thunkApi.getState().cart.totalPrice,
            userId: thunkApi.getState().auth.userId,
            jwtToken: thunkApi.getState().auth.jwtToken,
          })
        );
        thunkApi.dispatch(
          uiSliceActions.setSuccessMessage('Order placed successfully')
        );
      }
      return response.data;
    } catch (error) {
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      thunkApi.dispatch(uiSliceActions.setErrorMessage(error.message));
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchOrders = createAsyncThunk(
  'fetchOrders',
  async (_, thunkApi) => {
    thunkApi.dispatch(uiSliceActions.showSpinner());
    try {
      const response = await AxiosAuthenticatedRequests.get('orders.json');
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      return response.data;
    } catch (error) {
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      thunkApi.dispatch(uiSliceActions.setErrorMessage(error.message));
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const markOrderAsProcessedAction = createAsyncThunk(
  'markOrderAsProcessedAction',
  async (data, thunkApi) => {
    thunkApi.dispatch(uiSliceActions.showSpinner());
    try {
      const response = await AxiosAuthenticatedRequests.put(
        `orders/${data.userId}/${data.orderKey}.json`,
        { ...data, orderProcessed: true }
      );

      thunkApi.dispatch(uiSliceActions.hideSpinner());
      return response.data;
    } catch (error) {
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      thunkApi.dispatch(uiSliceActions.setErrorMessage(error.message));
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
