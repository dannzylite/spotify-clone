import { createSlice } from "@reduxjs/toolkit";


const playerSlice = createSlice({
    name: 'player',
    initialState: { played: {} },
    reducers: {
        addPlayer(state, action) {
            console.log(action.payload)
            state.played = action.payload
        }
    }
})

export const playerActions = playerSlice.actions

export default playerSlice