import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: 'search',
    initialState: { searched: [] },
    reducers: {
        addSearched(state, action) {
            state.searched = action.payload
        }
    }
})

export const searchActions = searchSlice.actions

export default searchSlice