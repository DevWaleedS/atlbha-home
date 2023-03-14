import { createSlice } from "@reduxjs/toolkit";
import { BlogDetailsThunk } from "../Thunk/BlogDetailsThunk";

let initState = {
  detailLoading: true,
  blogDetailAllData: [],
  detailPages: [],
  detailCategory: [],
};


let BlogDetailsReducer = createSlice({
  name: "blogDetails",
  initialState: initState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder

      .addCase(BlogDetailsThunk.pending, (state, action) => {
        // console.log("pending");
        state.detailLoading = true;
      })
      .addCase(BlogDetailsThunk.fulfilled, (state, action) => {
        state.blogDetailAllData = action.payload.data
        state.detailPages = action.payload.data.pages
        state.detailCategory = action.payload.data.postCategory
        state.detailLoading = false;
      })
      .addCase(BlogDetailsThunk.rejected, (state, action) => {
        // console.log("rejected");
        state.detailLoading = false;
      });
  },
});
// export let {  } = BlogDetailsReducer.actions;
export default BlogDetailsReducer.reducer;