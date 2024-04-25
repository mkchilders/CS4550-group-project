import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: { _id: "" },
};

const userSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = { ...action.payload, password: "" };
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
