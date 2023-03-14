import { createSlice } from "@reduxjs/toolkit";
import { YourPolicyThunk } from "../Thunk/YourPolicyThunk";
let initState = {
  policyName: null,
  policyTitle: null,
  policyDescription: null,
  policyLoadingData: true,
};

let YourPolicyReducer = createSlice({
  name: 'policy',
  initialState: initState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(YourPolicyThunk.pending, (state, action) => {
        state.policyLoadingData = true
      })
      .addCase(YourPolicyThunk.fulfilled, (state, action) => {
        state.policyLoadingData = false
        state.policyName = action.payload.data.pages.title
        state.policyTitle = action.payload.data.pages.seo_desc
        state.policyDescription = action.payload.data.pages.page_content

      })
      .addCase(YourPolicyThunk.rejected, (state, action) => {
        state.policyLoadingData = false
      })
  }
})
export default YourPolicyReducer
  .reducer