import { createSlice } from "@reduxjs/toolkit";

const likedSlice = createSlice({
    name: 'liked',
    initialState: {items:[], likedSongs:[]},
    reducers: {
        addToLiked(state, action) {
            state.items.push(action.payload)
        },
        removeFromLiked(state, action) {
            // console.log(action.payload)
            state.items = state.items.filter(song => {
                console.log(song.id, action.payload)
                return song.songId !== action.payload
            })
        },
        setLikedSongs(state, action) {
            state.likedSongs.push(action.payload)
        },
        removeLikedSong(state, action) {
            state.likedSongs = state.likedSongs.filter(id => {
                console.log(id, action.payload)
                return id !== action.payload
            })
        }
    }
})

export const likedActions = likedSlice.actions
export default likedSlice