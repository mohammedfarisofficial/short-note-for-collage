import { createSlice } from "@reduxjs/toolkit";
import { signOut } from "next-auth/react";

const authSlice = createSlice({
  name: "authState",
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      signOut();
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setAuth, setLogout } = authSlice.actions;
export default authSlice.reducer;
