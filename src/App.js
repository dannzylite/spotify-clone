import Footer from "./components/Layout/Footer";
import SideBar from "./components/Main/SideBar";
import './App.css'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Home from "./pages/Home";
import SeeAll from "./pages/SeeAll";
import Playlist from "./pages/Playlist";
import Header from "./components/Layout/Header";
import { useEffect, useRef, useState } from "react";
import LikedPlaylist from "./pages/LikedPlaylist";
import Search from "./pages/Search";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./store/ui-slice";


function App() {
  // const containerRef = useRef()
  const [auth, setAuth] = useState(false)
  const scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'
  const url = 'https://accounts.spotify.com/authorize'
  const CLIENT_ID = '15e362a97dc84c95a620883f7dd1d96c'
  const CLIENT_SECRET = '840df78d25c8470a8a8e8ac3c6dee88a'
  const REDIRECT_URI = 'http://localhost:3000'
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.ui.isLoggedIn)
  const location = useLocation()
  const navigate = useNavigate()
  // const code = queryParams.get('access_token');
  // console.log(queryParams, location)
  const accessToken = location.hash.slice(1).split('&')[0].split('=')[1];
  const expire_in = new Date() / 1000 + 3600
  console.log(accessToken,7788877)
  
  useEffect(() => {
    const token = window.localStorage.getItem('token')
    let expiry = window.localStorage.getItem('expiry')
    if (!token && !auth && isLoggedIn) {
      console.log(token,auth)
      window.location.replace(`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000&scope=${scopes}`)
      // window.localStorage.setItem('token', accessToken)
      // window.localStorage.setItem('expiry', expiry)
      // setAuth(true)
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
    console.log(expire_in, new Date / 1000)
    if (new Date() / 1000 > expiry) {
      window.localStorage.removeItem('token')
      setAuth(false)
    }
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





















 // const [visible, setVisible] = useState(true)
    // console.log(visible)
    // useEffect(() => {
    //     // const header = document.querySelector('.headerr')
    //     const observer = new IntersectionObserver(function (entries) { 
    //     const ent = entries[0]
    //         console.log(ent)
    //         // setSticky(ent.isIntersecting)
    //         setVisible(ent.isIntersecting)
    //     },
    //         // {
    //     // root: null,
    //     // threshold: 1,
    //     // rootMargin: '-50px'
    //     // }
    //     )
    //     if (containerRef.current) {
    //         observer.observe(containerRef.current)
    //     }
    //     // console.log(6)
    //     return () => {
    //         if (containerRef.current) {
    //             observer.unobserve(containerRef.current)
    //         }
    //     }
    // },[])