import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosAuthenticatedRequests from '../../Shared/AxiosConfig/axios-auth-req';
import AxiosRequests from '../../Shared/AxiosConfig/axios-non-auth-req';
import { phoneStoreSliceActions } from '../slices/phone-store-slice';
import { uiSliceActions } from '../slices/ui-slice';

export const fetchPhones = createAsyncThunk(
  'phoneStore/fetchPhones',
  async (_, thunkApi) => {
    thunkApi.dispatch(uiSliceActions.showSpinner());
    try {
      const response = await AxiosRequests.get('phones.json');
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      return response.data;
    } catch (error) {
      thunkApi.dispatch(uiSliceActions.setErrorMessage(error.message));
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addNewPhone = createAsyncThunk(
  'addNewPhone',
  async (data, thunkApi) => {
    thunkApi.dispatch(uiSliceActions.showSpinner());
    try {
      const response = await AxiosAuthenticatedRequests.post(
        'phones.json',
        data
      );
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      thunkApi.dispatch(
        uiSliceActions.setSuccessMessage('Phone stored successfuly')
      );
      thunkApi.dispatch(
        phoneStoreSliceActions.addNewPhoneToStore({
          ...data,
          id: response.data.name,
        })
      );
      return response.data;
    } catch (error) {
      thunkApi.dispatch(uiSliceActions.setErrorMessage(error.message));
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const editPhoneAction = createAsyncThunk(
  'editPhone',
  async (data, thunkApi) => {
    thunkApi.dispatch(uiSliceActions.showSpinner());
    try {
      const response = await AxiosAuthenticatedRequests.put(
        `phones/${data.id}.json`,
        data
      );
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      thunkApi.dispatch(
        uiSliceActions.setSuccessMessage('Phone stored successfuly')
      );
      thunkApi.dispatch(phoneStoreSliceActions.editPhoneInStore(data));
      return response.data;
    } catch (error) {
      thunkApi.dispatch(uiSliceActions.setErrorMessage(error.message));
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deletePhoneAction = createAsyncThunk(
  'deletePhone',
  async (id, thunkApi) => {
    thunkApi.dispatch(uiSliceActions.showSpinner());
    try {
      const response = await AxiosAuthenticatedRequests.delete(
        `phones/${id}.json`
      );
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      thunkApi.dispatch(phoneStoreSliceActions.removePhoneFromStore(id));
      thunkApi.dispatch(
        uiSliceActions.setSuccessMessage('Phone deleted successfuly')
      );
      return response.data;
    } catch (error) {
      thunkApi.dispatch(uiSliceActions.setErrorMessage(error.message));
      thunkApi.dispatch(uiSliceActions.hideSpinner());
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
