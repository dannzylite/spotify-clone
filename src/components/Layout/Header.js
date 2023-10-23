import React, { useEffect, useRef, useState } from 'react'
import { PersonOutlineOutlined, Search, ArrowDropDownOutlined, ChevronLeftOutlined, ChevronRightOutlined, PlayArrow } from '@material-ui/icons'
import classes from './Header.module.css'
import getArtist from '../../utils/format-artist'
import getDuration from '../../utils/format-duration'
import { useDispatch, useSelector } from 'react-redux'
import { searchActions } from '../../store/searched-slice'
import { Link } from 'react-router-dom'
import Option from './Option'


export default function Header(props) {
    // const [sticky, setSticky] = useState(true)
    // console.log(props.show,77)
    const [enteredText, setEnteredText] = useState('')
    const { loading, setIsLoading } = useState(false)
    const [showOption, setShowOption ] = useState(false)
    const isLoggedIn = useSelector(state => state.ui.isLoggedIn)
    const dispatch = useDispatch()
    console.log(window.localStorage.getItem('token'))
    const scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'
    const CLIENT_ID = '15e362a97dc84c95a620883f7dd1d96c'

    useEffect(() => {
        const timer = setTimeout(() => {
            async function searchData() {
                console.log(enteredText)
                // const res = await fetch(`https://v1.nocodeapi.com/ghost0fuchiha_/spotify/hlNbfhgIUiIRuLJC/search?q=${enteredText}&type=track&perPage=4`)
                const res = await fetch(`https://api.spotify.com/v1/search?q=${enteredText}&type=track&limit=4`, {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem('token')}`
                    }
                })
                const data = await res.json()
                console.log(data)
                const items = data.tracks.items
                const songs = items.map(item => {
                    return {
                        albumImg: item.album.images[2].url,
                        songName: item.name,
                        duration: getDuration(item.duration_ms / 60000),
                        artists: getArtist(item.artists),
                        songId: item.id
                    }      
                })
                dispatch(searchActions.addSearched(songs))
                console.log(songs)
            }
            if (enteredText.trim() !== '') {
                searchData()
            }
        }, 500)
        return () => {
            clearTimeout(timer)
        }
    }, [enteredText])

    console.log(enteredText)

    function searchHandler(event) {
        setEnteredText(event.target.value)
    }

    function loginHandler() {
        window.location.replace(`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000&scope=${scopes}`)
    }

    function showOptionHandler() {
        console.log('show:', showOption)
        setShowOption(prev => {
            return !prev
        })
    }
    
    
  return (
      <div className={`${(props.sticky === false) ? `${classes.sticky} ${classes.header}` : classes.header}`} style={{ backgroundColor: `${props.color && props.sticky === false ? props.color : `${!isLoggedIn ? '#000' : ''}`} `}}>
          <div className={classes.btn}>
              <button>
                  <ChevronLeftOutlined  className={classes.icon}/>
              </button>
              <button>
                  <ChevronRightOutlined  className={classes.icon}/>
              </button>
              {props.search && <div className={classes.search_box}>
                  <input className={classes.input} placeholder='Artist, song, podcast' onChange={searchHandler}/>
                  <Search className={classes.search} />
              </div>}
              <button className={classes.play} style={{opacity: `${props.show === false && props.sticky === false ? 1 : 0}`}}>
                  <PlayArrow className={classes.play_arrow} />
              </button>
              <p className={classes.name} style={{ opacity: `${props.show === false && props.sticky === false ? 1 : 0}`}}>{props.name}</p>
          </div>
          {isLoggedIn && <div className={classes.info} onClick={showOptionHandler}>
              <div className={classes.icon_box}>
                  <PersonOutlineOutlined className={classes.icon} />
              </div>
              <p>Daniel Okorie</p>
              <div className={classes.dowm}>
                  <ArrowDropDownOutlined className={classes.down} />
                  {showOption && <Option />}
              </div>
          </div>}
          {!isLoggedIn && <nav className={classes.nav}>
              <Link to=''>Premium</Link>
              <Link to=''>Support</Link>
              <Link to=''>Download</Link>
              <span>|</span>
              <button className={classes.sign_up}>Sign up</button>
              <button className={classes.log_in} onClick={loginHandler}>Log in</button>
          </nav>}
    </div>
  )
}
