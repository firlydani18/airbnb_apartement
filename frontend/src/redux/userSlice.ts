import {createSlice} from "@reduxjs/toolkit";
interface User {
  user: {
    role: string | null;
    name: string | null;
    email: string | null;
    avatar: string | null;
  } | null;
}

const initialState: User | null = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const {signInUser, logoutUser} = userSlice.actions;
export default userSlice.reducer;
