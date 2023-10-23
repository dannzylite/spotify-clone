import { configureStore } from "@reduxjs/toolkit";
import likedSlice from "./liked-slice";
import playerSlice from "./player-slice";
import playlistSlice from "./playlist-slice";
import searchSlice from "./searched-slice";
import uiSlice from "./ui-slice";




const store = configureStore({
    reducer: {liked: likedSlice.reducer, playlist: playlistSlice.reducer, player: playerSlice.reducer, search: searchSlice.reducer, ui: uiSlice.reducer}
})

export default store