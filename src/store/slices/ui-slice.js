import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    numberOfRunningSpinners: 0,
    successMessage: null,
    errorMessage: null,
  },
  reducers: {
    showSpinner(state, action) {
      state.numberOfRunningSpinners++;
    },
    hideSpinner(state, action) {
      state.numberOfRunningSpinners--;
    },
    setSuccessMessage(state, action) {
      state.successMessage = action.payload;
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
  },
});

export const uiSliceActions = uiSlice.actions;
export default uiSlice;
