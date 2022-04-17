import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/auth-slice';
import cartSlice from './slices/cart-slice';
import ordersSlice from './slices/orders-slice';
import phoneStoreSlice from './slices/phone-store-slice';
import uiSlice from './slices/ui-slice';
import usersSlice from './slices/users-slice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    phoneStore: phoneStoreSlice.reducer,
    ui: uiSlice.reducer,
    orders: ordersSlice.reducer,
    users: usersSlice.reducer,
  },
});

export default store;
