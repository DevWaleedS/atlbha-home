import { createSlice } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import { VideoThunk } from "../Thunk/VideoThunk";
let initState = {
    videoData: null,
};

export let VideoReducer = createSlice({
    name: "video-reducer",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(VideoThunk.pending, (state, action) => {
                // console.log("pending");
            })
            .addCase(VideoThunk.fulfilled, (state, action) => {
                state.videoData = action.payload;
                // console.log("fulfilled");
            })
            .addCase(VideoThunk.rejected, (state, action) => {
                console.log("rejected");
            });
    },
});
// export let {  } = VideoReducer.actions;
export default VideoReducer.reducer;
