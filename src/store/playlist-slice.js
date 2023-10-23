import { createSlice } from "@reduxjs/toolkit";

const playlistSlice = createSlice({
    name: 'playlist',
    initialState: { playlists: [] },
    reducers: {
        addPlaylist(state) {
            // state.playlists.push({`playlist ${state.playlists.length + 1}`:[]})
        }
    }
})

export const playlistActions = playlistSlice.actions

export default playlistSlice