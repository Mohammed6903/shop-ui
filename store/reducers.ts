import { createSlice, combineReducers } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    quantity: 0,
  },
  reducers: {
    setQuantity(state, action) {
      state.quantity = action.payload;
    },
    incrementQuantity(state) {
      state.quantity += 1;
    },
    decrementQuantity(state) {
      state.quantity = Math.max(0, state.quantity - 1);
    },
  },
});

export const { setQuantity, incrementQuantity, decrementQuantity } = cartSlice.actions;

const rootReducer = combineReducers({
  cart: cartSlice.reducer,
});

export default rootReducer;