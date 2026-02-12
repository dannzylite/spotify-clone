import Footer from "./components/Layout/Footer";
import SideBar from "./components/Main/SideBar";
import './App.css'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Home from "./pages/Home";
import SeeAll from "./pages/SeeAll";
import Playlist from "./pages/Playlist";
import { useEffect, useState } from "react";
import LikedPlaylist from "./pages/LikedPlaylist";
import Search from "./pages/Search";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./store/ui-slice";


function App() {
  const [auth, setAuth] = useState(false)
  const scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'
  const CLIENT_ID = '15e362a97dc84c95a620883f7dd1d96c'
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.ui.isLoggedIn)
  const location = useLocation()
  const navigate = useNavigate()
  const accessToken = location.hash.slice(1).split('&')[0].split('=')[1];
  const expire_in = new Date() / 1000 + 3600
  console.log(accessToken,7788877)

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    let expiry = window.localStorage.getItem('expiry')
    if (!token && !auth && isLoggedIn) {
      console.log(token,auth)
      window.location.replace(`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000&scope=${scopes}`)
    }
    if (accessToken) {
      window.localStorage.setItem('token', accessToken)
      window.localStorage.setItem('expiry', expire_in)
      console.log(expire_in, accessToken)
      dispatch(uiActions.login())
      navigate('/')
      setAuth(true)

    }
    if (token) {
      dispatch(uiActions.login())
    }
    console.log(expire_in, new Date() / 1000)
    if (new Date() / 1000 > expiry) {
      window.localStorage.removeItem('token')
      setAuth(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, isLoggedIn])

  if (accessToken) {
    window.localStorage.setItem('token', accessToken)
  }

  return (
    <div className="app">
      <main>
        <SideBar />
        <div className='pages'>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/see-all/:id" element={<SeeAll />} />
                <Route path='/playlist/:id' element={<Playlist />} />
                <Route path='/liked' element={<LikedPlaylist />} />
                <Route path='/search' element={<Search />} />
            </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
