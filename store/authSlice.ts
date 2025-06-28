import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loggedIn: false, 
  },
  reducers: {
    toggleLogin: (state) => {
      state.loggedIn = !state.loggedIn;
    },
  },
});

export const { toggleLogin } = authSlice.actions;
export default authSlice.reducer;
