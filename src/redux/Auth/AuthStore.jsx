import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  email: "",
};

// eslint-disable-next-line react-refresh/only-export-components
const AuthStore = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: async () => {
      return null;
    },
  },
});

export const { login } = AuthStore.actions;

export default AuthStore.reducer;
