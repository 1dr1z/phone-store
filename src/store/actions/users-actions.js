import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosAuthenticatedRequests from '../../Shared/AxiosConfig/axios-auth-req';
import { uiSliceActions } from '../slices/ui-slice';
import { usersSliceActions } from '../slices/users-slice';

export const fetchUsers = createAsyncThunk(
  'fetchUsers',
  async (_, thunkApi) => {
    thunkApi.dispatch(uiSliceActions.showSpinner());

    try {
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      const response = await AxiosAuthenticatedRequests.get('/users.json');
      return response.data;
    } catch (error) {
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      thunkApi.dispatch(uiSliceActions.setErrorMessage(error.message));
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const updateUserRole = createAsyncThunk(
  'updateUser',
  async (data, thunkApi) => {
    thunkApi.dispatch(uiSliceActions.showSpinner());

    try {
      const response = await AxiosAuthenticatedRequests.put(
        `/users/${data.userKey}.json`,
        data
      );
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      thunkApi.dispatch(usersSliceActions.editUserInStore(data));
      thunkApi.dispatch(
        uiSliceActions.setSuccessMessage('User role successfully updated')
      );

      return response.data;
    } catch (error) {
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      thunkApi.dispatch(uiSliceActions.setErrorMessage(error.message));
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
