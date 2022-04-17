import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosAuthenticatedRequests from '../../Shared/AxiosConfig/axios-auth-req';
import {
  sendSignInRequest,
  sendSignUpRequest,
} from '../../Shared/AxiosConfig/axios-sign-in-up';
import { RolesEnum } from '../../Shared/Enums/auth-role-enum';
import { uiSliceActions } from '../slices/ui-slice';
import { initApp } from './init-app';

export const sendSignInRequestAction = createAsyncThunk(
  'auth/signin',
  async (credentials, thunkApi) => {
    thunkApi.dispatch(uiSliceActions.showSpinner());
    try {
      const response = await sendSignInRequest(
        credentials.email,
        credentials.password
      );
      if (response.status === 200) {
        thunkApi.dispatch(fetchUsersWithRoles());
      }
      thunkApi.dispatch(
        initApp({
          jwtToken: response.data.idToken,
          userId: response.data.localId,
        })
      );
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      return response.data;
    } catch (error) {
      thunkApi.dispatch(uiSliceActions.setErrorMessage(error.message));
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const sendSignUpRequestAction = createAsyncThunk(
  'auth/signup',
  async (credentials, thunkApi) => {
    thunkApi.dispatch(uiSliceActions.showSpinner());
    try {
      const response = await sendSignUpRequest(
        credentials.email,
        credentials.password
      );
      if (response.status === 200) {
        thunkApi.dispatch(
          storeUsersAndTheirRoles({
            email: response.data.email,
            userId: response.data.localId,
            role: RolesEnum.GUEST,
            jwtToken: response.data.idToken,
          })
        );
      }
      thunkApi.dispatch(
        initApp({
          jwtToken: response.data.idToken,
          userId: response.data.localId,
        })
      );
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      return { ...response.data, role: RolesEnum.GUEST };
    } catch (error) {
      thunkApi.dispatch(uiSliceActions.setErrorMessage(error.message));
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const storeUsersAndTheirRoles = createAsyncThunk(
  'auth/roles/store',
  async (data, thunkApi) => {
    thunkApi.dispatch(uiSliceActions.showSpinner());
    try {
      const response = await AxiosAuthenticatedRequests.post(
        '/users.json',
        JSON.stringify({
          userId: data.userId,
          email: data.email,
          role: data.role,
        }),
        { params: { auth: data.jwtToken } }
      );
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      return { data: response.data, role: data.role };
    } catch (error) {
      thunkApi.dispatch(uiSliceActions.setErrorMessage(error.message));
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchUsersWithRoles = createAsyncThunk(
  'auth/roles/fetch',
  async (_, thunkApi) => {
    thunkApi.dispatch(uiSliceActions.showSpinner());
    try {
      const response = await AxiosAuthenticatedRequests.get('users.json');
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      return response.data;
    } catch (error) {
      thunkApi.dispatch(uiSliceActions.setErrorMessage(error.message));
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
