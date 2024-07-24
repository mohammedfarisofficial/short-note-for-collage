import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authState",
  initialState: {
    user: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
