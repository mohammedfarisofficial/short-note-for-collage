import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "uiSlice",
  initialState: {
    navigation: null,
  },
  reducers: {
    setNavigation: (state, action) => {
      state.navigation = action.payload;
    },
  },
});


export const { setNavigation } = uiSlice.actions;
export default uiSlice.reducer;
