import { createSlice } from "@reduxjs/toolkit";
import { LoginThunk } from "../Thunk/LoginThunk";
let initState = {
  loginLoading: false,
  loginToken: null,
  loginSuccess: false,
};

let LoginReducer = createSlice({
  name: "stores",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(LoginThunk.pending, (state, action) => {
        // console.log("loading");
        state.loginLoading = true;
      })
      .addCase(LoginThunk.fulfilled, (state, action) => {

        state.loginToken = action.payload.data?.token;
        state.loginToken = action.payload.loginSuccess;
        state.loginLoading = false;
      })
      .addCase(LoginThunk.rejected, (state, action) => {
        console.log("rejected");
        state.loginLoading = false;
      });
  },
});
// export let {  } = StoresReducer.actions;
export default LoginReducer.reducer;
