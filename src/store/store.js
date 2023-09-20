import { configureStore } from "@reduxjs/toolkit";
import endpointsReducer from "./endpointsSlice";
export default configureStore({
    reducer: {
        endpoints: endpointsReducer,
    },
});
