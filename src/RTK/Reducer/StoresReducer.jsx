import { createSlice } from "@reduxjs/toolkit";
import { StoresThunk } from "../Thunk/StoresThunk";
let initState = {
    storesLoading: false,
    storesData: [],
};

let StoresReducer = createSlice({
    name: "stores",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(StoresThunk.pending, (state, action) => {
                // console.log("loading");
                state.storesLoading = true;
            })
            .addCase(StoresThunk.fulfilled, (state, action) => {
                // console.log(action.payload);
                state.storesData = action.payload;
                state.storesLoading = false;
            })
            .addCase(StoresThunk.rejected, (state, action) => {
                console.log("rejected");
                state.storesLoading = false;
            });
    },
});
// export let {  } = StoresReducer.actions;
export default StoresReducer.reducer;
