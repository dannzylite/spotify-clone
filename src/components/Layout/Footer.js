import { LinearProgress } from '@material-ui/core'
import { DevicesOutlined, FavoriteRounded, Mic, OpenInNew, Pause, PlayArrow, QueueMusic, Repeat, Shuffle, SkipNext, SkipPrevious, VolumeUp } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SpotifyWebApi from 'spotify-web-api-node'
import { uiActions } from '../../store/ui-slice'
import classes from './Footer.module.css'
const spotify = new SpotifyWebApi()
spotify.setAccessToken(window.localStorage.getItem('token'));

export default function Footer() {
  const current = useSelector(state => state.player.played)
  const like = useSelector(state => state.liked.likedSongs)
  const isLoggedIn = useSelector(state => state.ui.isLoggedIn)
  const isPlaying = useSelector(state => state.ui.isPlaying)
  const [progress, setProgress] = useState(0)
  const [time, setTime] = useState(0.00)
  const dispatch = useDispatch()
  const [continueSong, setContinueSong] = useState(false)
  // console.log(current, 'current')
  let songProgress
 
    if (Object.keys(current).length > 0) {
      // console.log('000000', 'current')
      spotify.getMyCurrentPlayingTrack()
      .then(function (data) {
          console.log('Now playing: ' + data.body);
        songProgress = data.body.progress_ms / data.body.item.duration_ms * 100
        const min = ((data.body.progress_ms / data.body.item.duration_ms * current.duration) / 60)
        const sec = ((data.body.progress_ms / data.body.item.duration_ms * current.duration) % 60)
        const timer = Math.floor(((min + sec) / 1.7 * 100) / 60) + (((((min + sec) / 1.7) * 100) % 60)) / 100
        console.log((((((min + sec) / 1.7) * 100) % 60)) / 100)
        // console.log(timer, Math.floor(((min+sec) / 1.7 * 100) / 60), ((((min+sec) / 1.7) * 100) % 60))
        setTime(timer.toFixed(2))
        setProgress(songProgress)
        console.log('songprogress', songProgress, current)
        }, function (err) {
          console.log('Something went wrong!', err);
      });
      // setTimeout(() => {
      //   setTime(prev => {
      //     if (prev)
      //   })
      // },1000)
  }
  useEffect(() => {
    if (isPlaying) {
      setContinueSong(true)
    }
  }, [isPlaying])
  
  function continueSongHandler() {
    dispatch(uiActions.play())
    spotify.play()
      .then(function() {
          console.log('Playback started');
      }, function(err) {
          //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
          console.log('Something went wrong!', err);
      });
  }

  function playHandler(id) {
    dispatch(uiActions.play())
    spotify.play({
        uris: [`spotify:track:${id}`]
    })
        .then(function() {
            console.log('Playback started');
        }, function(err) {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            console.log('Something went wrong!', err);
        });
}

  function pauseHandler(id) {
  console.log(id, 'pausee')
    dispatch(uiActions.pause())
    spotify.pause({
        uris: [`spotify:track:${id}`]
    })
        .then(function() {
            console.log('Playback paused');
        }, function(err) {
            //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
            console.log('Something went wrong!', err);
        });
  }
  
  if (!isLoggedIn) {
    return <div className={classes.footer} style={{background:`linear-gradient(to right, #c82760,rgb(99, 99, 179),#74c0fc)`, height:'7rem'}}>
      <div className={classes.details}>
        <p>Preview of Spotify</p>
        <p>Sign up to get unlimited songs and podcast with occasional ads. No credit card need</p>
      </div>
      <button className={classes.sign_up}>Sign up free</button>
    </div>
  }
  return (
     <div className={classes.footer}>
      <div className={classes.content}>
        <div className={classes.img_box}>
          {current.albumImg && <img src={current.albumImg} alt='album cover' />}
        </div>
        <div className={classes.song_info}>
          <p>{current.songName}</p>
          <p>{current.artists}</p>
        </div>
        {like.includes(current.songId) && <button><FavoriteRounded className={classes.icon} /></button>}
      </div>
      <div className={classes.player}>
        <div className={classes.icons}>
          <button>
            <Shuffle className={classes.icon}/>
          </button>
          <button>
            <SkipPrevious className={classes.icon}/>
          </button>
          {!isPlaying && <button className={classes.play} onClick={!continueSong ? playHandler.bind(null, current.songId) : continueSongHandler}>
            <PlayArrow className={classes.play_arrow} />
            </button>}
              {isPlaying && <button className={classes.play} onClick={pauseHandler.bind(null, current.songId)}>
                <Pause className={classes.play_arrow} />
              </button>}
          <button>
            <SkipNext className={classes.icon}/>
          </button>
          <button>
            <Repeat className={classes.icon}/>
          </button>
        </div>
        <div className={classes.progress}>
          <p>{time}</p>
          <LinearProgress className={classes.progress_bar} variant='determinate' value={progress}/>
          <p>{current.duration}</p>
        </div>
      </div>
      <div className={classes.icons_1}>
        <button>
          <Mic  className={classes.icon}/>
        </button>
        <button>
          <QueueMusic  className={classes.icon}/>
        </button>
        <button>
          <DevicesOutlined  className={classes.icon}/>
        </button>
        <button className={classes.volume}>
          <VolumeUp className={classes.icon} />
          <div className={classes.volume_bar}></div>
        </button>
        <button>
          <OpenInNew  className={classes.icon}/>
        </button>
      </div>
    </div>
  )
}
