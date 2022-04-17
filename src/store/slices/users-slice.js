import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../actions/users-actions';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
  },
  reducers: {
    editUserInStore(state, action) {
      const newItem = action.payload;
      const editedItems = state.users.map((item) => {
        if (item.userKey === newItem.userKey) {
          return { ...newItem, userKey: item.userKey };
        }
        return item;
      });
      state.users = editedItems;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const transformedArray = [];
      if (action.payload) {
        for (let key in action.payload) {
          transformedArray.push({ ...action.payload[key], userKey: key });
        }
      }
      state.users = transformedArray;
    });
  },
});

export const usersSliceActions = usersSlice.actions;
export default usersSlice;
