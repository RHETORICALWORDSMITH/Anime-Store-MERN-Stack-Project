import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
  item: {},
};

const buyComVisSlice = createSlice({
  name: "value",
  initialState,
  reducers: {
    changeVisibility: (state, action) => {
      const { item } = action.payload;
      console.log(item);
      state.item = item;
      state.value = !state.value;

      console.log("works");
      console.log(state.value);
    },
  },
});

export const { changeVisibility } = buyComVisSlice.actions;

export default buyComVisSlice.reducer;
