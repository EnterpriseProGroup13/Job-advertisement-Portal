import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customers: []  // holds an array of customer objects
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload;
    }
    // You can add more customer-related reducers here if needed
  }
});

export const { setCustomers } = customerSlice.actions;
export default customerSlice.reducer;
