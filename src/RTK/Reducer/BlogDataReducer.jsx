import { createSlice } from "@reduxjs/toolkit";
import { BlogDataThunk } from "../Thunk/BlogDataThunk";
let initState = {
  BlogLoadingData: true,

  BlogAllData: [],
  pagesData: [],
  pagesTargetData: [],
  postCategory: [],
  allPageIncrease: 12,
  tradePageIncrease: 12,
  marketingPageIncrease: 12,
  storePageIncrease: 12,

};
let BlogDataReducer = createSlice({
  name: "blog",
  initialState: initState,
  reducers: {
    blogType: (state, action) => {
      // console.log(action.payload.type);
      if (action.payload.type === "all") {
        let data = state.pagesData;
        state.pagesTargetData = data.slice(0, 9)
      }
      if (action.payload.type === "التجارة الالكترونية") {
        let data = state.pagesData
        state.pagesTargetData = data.filter((el) => action.payload.type === el.postCategory.name).slice(0, 9);
      }
      if (action.payload.type === "التسويق الرقمي") {
        let data = state.pagesData
        state.pagesTargetData = data.filter((el) => action.payload.type === el.postCategory.name).slice(0, 9);
      }
      if (action.payload.type === " ادارة الاسواق") {

        let data = state.pagesData
        state.pagesTargetData = data.filter((el) => action.payload.type === el.postCategory.name).slice(0, 9);

      }

    },
    PageIncrease: (state, action) => {
      if (action.payload.type === "all") {
        let data = state.pagesData;
        state.pagesTargetData = data.slice(0, state.allPageIncrease)
        state.allPageIncrease += 3
      }
      if (action.payload.type === "التجارة الالكترونية") {
        let data = state.pagesData
        state.pagesTargetData = data.filter((el) => action.payload.type === el.postCategory.name).slice(0, state.tradePageIncrease);
        state.tradePageIncrease += 3

      }
      if (action.payload.type === "التسويق الرقمي") {
        let data = state.pagesData
        state.pagesTargetData = data.filter((el) => action.payload.type === el.postCategory.name).slice(0, state.marketingPageIncrease);
        state.marketingPageIncrease += 3

      }
      if (action.payload.type === " ادارة الاسواق") {

        let data = state.pagesData
        state.pagesTargetData = data.filter((el) => action.payload.type === el.postCategory.name).slice(0, state.storePageIncrease);
        state.storePageIncrease += 3


      }

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(BlogDataThunk.pending, (state, action) => {
        state.BlogLoadingData = true
      })
      .addCase(BlogDataThunk.fulfilled, (state, action) => {
        state.BlogLoadingData = false
        state.BlogAllData = action.payload.data
        state.pagesData = action.payload.data.pages
        state.pagesTargetData = action.payload.data.pages.slice(0, 9)
        state.postCategory = action.payload.data.postCategory

      })
      .addCase(BlogDataThunk.rejected, (state, action) => {
        state.BlogLoadingData = false
      })
  }
})
export let { blogType, PageIncrease } = BlogDataReducer.actions;
export default BlogDataReducer.reducer