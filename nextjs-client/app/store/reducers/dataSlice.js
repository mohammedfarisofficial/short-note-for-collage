import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    universities: null,
  },
  reducers: {
    setUniversities: (state, action) => {
      state.universities = action.payload;
    },
  },
});

export const { setUniversities } = dataSlice.actions;
export default dataSlice.reducer;
