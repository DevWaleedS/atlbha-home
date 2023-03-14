import { createSlice } from "@reduxjs/toolkit";
import { PackageThunk } from "../Thunk/PackageThunk";
let initState = {
    packageLoading: false,
    packageDataMonthly: null,
    packageDataYearly: null,
};

let PackageReducer = createSlice({
    name: "product",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(PackageThunk.pending, (state, action) => {
                // console.log("loading");
                state.packageLoading = true;
            })
            .addCase(PackageThunk.fulfilled, (state, action) => {
                // console.log(action.payload[0].yearly);
                state.packageDataMonthly = action.payload[0].monthly;
                state.packageDataYearly = action.payload[0].yearly;
                state.packageLoading = false;
            })
            .addCase(PackageThunk.rejected, (state, action) => {
                console.log("rejected");
                state.packageLoading = false;
            });
    },
});
// export let {  } = PackageReducer.actions;
export default PackageReducer.reducer;