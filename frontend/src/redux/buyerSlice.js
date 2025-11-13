// src/redux/buyerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const buyerSlice = createSlice({
  name: "buyer",
  initialState: {
    requirements: [],
  },
  reducers: {
    addRequirement: (state, action) => {
      state.requirements.push(action.payload);
    },
  },
});

export const { addRequirement } = buyerSlice.actions;
export default buyerSlice.reducer;
