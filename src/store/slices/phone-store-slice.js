import { createSlice } from '@reduxjs/toolkit';
import { addNewPhone, fetchPhones } from '../actions/phone-store-actions';

const phoneStoreSlice = createSlice({
  name: 'phoneStore',
  initialState: {
    items: [],
  },

  reducers: {
    sortPhoneItems(state, action) {
      if (action.payload === 'asc') {
        state.items.sort((a, b) => +a.price - +b.price);
      } else if (action.payload === 'desc') {
        state.items.sort((a, b) => +b.price - +a.price);
      } else {
        state.items.sort((a, b) => a.id - b.id);
      }
    },
    addNewPhoneToStore(state, action) {
      state.items.push(action.payload);
    },
    editPhoneInStore(state, action) {
      const newItem = action.payload;
      const editedItems = state.items.map((item) => {
        if (item.id === newItem.id) {
          return { ...newItem, id: item.id };
        }
        return item;
      });
      state.items = editedItems;
    },
    removePhoneFromStore(state, action) {
      const filteredItems = state.items.filter(
        (item) => item.id !== action.payload
      );
      state.items = filteredItems;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPhones.fulfilled, (state, action) => {
      const transformedArray = [];
      if (action.payload) {
        for (let key in action.payload) {
          transformedArray.push({ ...action.payload[key], id: key });
        }
      }
      state.items = transformedArray;
    });
    builder.addCase(addNewPhone.fulfilled, (state, action) => {});
  },
});

export const phoneStoreSliceActions = phoneStoreSlice.actions;
export default phoneStoreSlice;
