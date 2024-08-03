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
    setNote: (state, action) => {
      state.universities.notes.push(action.payload);
    },
  },
});

export const { setUniversities, setNote } = dataSlice.actions;
export default dataSlice.reducer;
