import { createSlice } from '@reduxjs/toolkit';
import { fetchCartData, storeCartData } from '../actions/cart-actions';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    totalItems: 0,
    itemsInCart: [],
    totalPrice: 0,
    changed: false,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.itemsInCart.find(
        (item) => item.id === newItem.id
      );
      if (!existingItem) {
        state.itemsInCart.push({
          id: newItem.id,
          price: +newItem.price,
          totalItems: 1,
          totalPrice: +newItem.price,
          name: newItem.name,
          imgUrl: newItem.imgUrl,
        });
        state.totalPrice += +newItem.price;
      } else {
        existingItem.totalItems++;
        existingItem.totalPrice += +newItem.price;
        state.totalPrice += +newItem.price;
      }
      state.totalItems++;
      state.changed = true;
    },
    addFetchedItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.itemsInCart.find((item) => {
        return item.id === newItem.id;
      });
      if (!existingItem) {
        state.itemsInCart.push(newItem);
        state.totalPrice += +newItem.totalPrice;
        state.totalItems += +newItem.totalItems;
      } else {
        existingItem.totalItems += +newItem.totalItems;
        existingItem.totalPrice += +newItem.totalPrice;
        state.totalItems += +newItem.totalItems;
        state.totalPrice += +newItem.totalPrice;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.itemsInCart.find((item) => item.id === id);
      if (existingItem.totalItems === 1) {
        state.itemsInCart = state.itemsInCart.filter((item) => item.id !== id);
        state.totalPrice -= +existingItem.price;
      } else {
        existingItem.totalItems--;
        existingItem.totalPrice -= +existingItem.price;
        state.totalPrice -= +existingItem.price;
      }

      state.totalItems--;
      state.changed = true;
    },
    clearCart: (state, action) => {
      state.totalItems = 0;
      state.itemsInCart = [];
      state.totalPrice = 0;
      state.changed = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(storeCartData.fulfilled, (state, action) => {});
    builder.addCase(fetchCartData.fulfilled, (state, action) => {});
    builder.addCase(fetchCartData.rejected, (state, action) => {});
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
