import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: 'ui',
    initialState: { isLoggedIn: false, isPlaying:false, playing:'' },
    reducers: {
        login(state) {
            state.isLoggedIn = true
        },
        logout(state) {
            state.isLoggedIn = false
            console.log(67)
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('expiry')
        },
        play(state, action) {
            state.isPlaying = true
            state.playing = action.payload
        },
        pause(state) {
            state.isPlaying = false
        }
    }
})

export const uiActions = uiSlice.actions

export default uiSlice