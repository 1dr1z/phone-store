import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosAuthenticatedRequests from '../../Shared/AxiosConfig/axios-auth-req';
import { cartActions } from '../slices/cart-slice';
import { uiSliceActions } from '../slices/ui-slice';

export const storeCartData = createAsyncThunk(
  'cart/store',
  async (data, thunkApi) => {
    thunkApi.dispatch(uiSliceActions.showSpinner());
    try {
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      const response = await AxiosAuthenticatedRequests.put(
        `/cart/${data.userId}.json`,
        {
          totalItems: data.totalItems,
          itemsInCart: data.itemsInCart,
          totalPrice: data.totalPrice,
          userId: data.userId,
        },
        { params: { auth: data.jwtToken } }
      );
      return response.data;
    } catch (error) {
      thunkApi.dispatch(uiSliceActions.setErrorMessage(error.message));

      thunkApi.dispatch(uiSliceActions.hideSpinner());
      return thunkApi.isRejectedWithValue(error.message);
    }
  }
);

export const fetchCartData = createAsyncThunk(
  'cart/fetch',
  async (data, thunkApi) => {
    thunkApi.dispatch(uiSliceActions.showSpinner());
    try {
      const response = await AxiosAuthenticatedRequests.get(
        `cart/${data.userId}.json`,
        { params: { auth: data.jwtToken } }
      );
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      if (response.data?.itemsInCart) {
        for (let item of response.data.itemsInCart) {
          thunkApi.dispatch(cartActions.addFetchedItemToCart(item));
        }
      }
      const state = { ...thunkApi.getState().cart };
      if (!!data?.jwtToken || thunkApi.getState().auth.isAuthenticated) {
        thunkApi.dispatch(
          storeCartData({
            totalItems: state.totalItems,
            itemsInCart: state.itemsInCart,
            totalPrice: state.totalPrice,
            userId: data.userId,
            jwtToken: data.jwtToken,
          })
        );
      }

      return response.data;
    } catch (error) {
      thunkApi.dispatch(uiSliceActions.setErrorMessage(error.message));

      thunkApi.dispatch(uiSliceActions.hideSpinner());
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addItemToCartAction = createAsyncThunk(
  'cart/addToBasketAction',
  async (data, thunkApi) => {
    thunkApi.dispatch(cartActions.addItemToCart(data));
    if (thunkApi.getState().auth.isAuthenticated) {
      thunkApi.dispatch(
        storeCartData({
          totalItems: thunkApi.getState().cart.totalItems,
          itemsInCart: thunkApi.getState().cart.itemsInCart,
          totalPrice: thunkApi.getState().cart.totalPrice,
          userId: thunkApi.getState().auth.userId,
        })
      );
    }

    return thunkApi.fulfillWithValue(data);
  }
);
export const removeItemFromCartAction = createAsyncThunk(
  'cart/removeFromBasketAction',
  async (data, thunkApi) => {
    thunkApi.dispatch(cartActions.removeItemFromCart(data));

    if (thunkApi.getState().auth.isAuthenticated) {
      thunkApi.dispatch(
        storeCartData({
          totalItems: thunkApi.getState().cart.totalItems,
          itemsInCart: thunkApi.getState().cart.itemsInCart,
          totalPrice: thunkApi.getState().cart.totalPrice,
          userId: thunkApi.getState().auth.userId,
        })
      );
    }

    return thunkApi.fulfillWithValue(data);
  }
);
