import { createSlice } from "@reduxjs/toolkit";
import User from "@/types/User";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    accountType: "",
    sessionID: "",
    iat: 0,
    exp: 0,
  } as User,
  reducers: {
    setUser: (state, action: { payload: User }) => {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.accountType = action.payload.accountType;
      state.sessionID = action.payload.sessionID;
      state.iat = action.payload.iat;
      state.exp = action.payload.exp;
    },
    clearUser: (state) => {
      state.id = "";
      state.firstName = "";
      state.lastName = "";
      state.username = "";
      state.email = "";
      state.accountType = "";
      state.sessionID = "";
      state.iat = 0;
      state.exp = 0;
    },
  },
});

export const { setUser, clearUser } = UserSlice.actions;
export default UserSlice.reducer;
