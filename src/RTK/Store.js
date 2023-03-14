import { configureStore } from "@reduxjs/toolkit";
import StoresReducer from "./Reducer/StoresReducer.jsx";
import VideoReducer from "./Reducer/VideoReducer.jsx";
import PackageReducer from "./Reducer/PackageReducer.jsx";
import HomeReducer from "./Reducer/HomeReducer.jsx";
import BlogDataReducer from "./Reducer/BlogDataReducer";
import BlogDetailsReducer from "./Reducer/BlogDetailsReducer";
import FooterReducer from "./Reducer/FooterReducer";
import YourPolicyReducer from "./Reducer/YourPolicyReducer";
import LoginReducer from "./Login/Reducer/LoginReducer";
export let Store = configureStore({
    reducer: {
        StoresReducer,
        VideoReducer,
        PackageReducer,
        HomeReducer,
        BlogDataReducer,
        BlogDetailsReducer,
        FooterReducer,
        YourPolicyReducer,
        LoginReducer,
    },
});
