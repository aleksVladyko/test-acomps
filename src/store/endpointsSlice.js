import { createSlice } from "@reduxjs/toolkit";
import mockData from "../../mock.json";

const endpointsSlice = createSlice({
    name: "endpoints",
    initialState: {
        endpoints: mockData,
        searchVal: "",
        endpointType: "",
        tags: [],
        currentPage: 1,
        itemsPerPage: 5,
    },
    reducers: {
        setSearchVal: (state, action) => {
            state.searchVal = action.payload;
        },
        setEndpointType: (state, action) => {
            state.endpointType = action.payload;
        },
        setTags: (state, action) => {
            state.tags = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },
});

export const { setSearchVal, setEndpointType, setTags, setCurrentPage } =
    endpointsSlice.actions;

export default endpointsSlice.reducer
