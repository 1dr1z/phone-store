import { createAsyncThunk } from '@reduxjs/toolkit';
import { authActions } from '../slices/auth-slice';
import { fetchCartData } from './cart-actions';

export const initApp = createAsyncThunk(
  'initApp',
  async (payload, thunkApi) => {
    thunkApi.dispatch(authActions.checkIfAuthenticated());
    const jwtToken = payload
      ? payload.jwtToken
      : thunkApi.getState().auth.jwtToken;
    const userId = payload ? payload.userId : thunkApi.getState().auth.userId;
    if (!!payload?.jwtToken || thunkApi.getState().auth.isAuthenticated) {
      thunkApi.dispatch(fetchCartData({ userId, jwtToken }));
    }
  }
);
