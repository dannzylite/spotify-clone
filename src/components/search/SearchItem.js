import React from 'react'
import classes from './SearchItem.module.css'
import { PlayArrow, FavoriteBorderOutlined, MoreHorizRounded, Pause } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { playerActions } from '../../store/player-slice'
import SpotifyWebApi from 'spotify-web-api-node'
import { uiActions } from '../../store/ui-slice'
const spotify = new SpotifyWebApi()
spotify.setAccessToken(window.localStorage.getItem('token'));

export default function SearchItem(props) {
    const like = useSelector(state => state.liked.likedSongs)
    const isPlaying = useSelector(state => state.ui.isPlaying)
    console.log(like, 888)
    const dispatch = useDispatch()

    function addPlayerHandler() {
        playHandler(props.songId)
        dispatch(playerActions.addPlayer({
            id: props.id,
            songName: props.songName,
            artists: props.artists,
            albumImg: props.albumImg,
            duration: props.duration,
            songId: props.songId
        }))
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

  return (
      <li className={classes.content}>
          <p className={classes.id}>
          {!isPlaying && <button onClick={addPlayerHandler}>
            <PlayArrow className={classes.play_arrow} />
            </button>}
              {isPlaying && <button onClick={pauseHandler.bind(null, props.songId)}>
                <Pause className={classes.play_arrow} />
              </button>}
          </p>
          <div className={classes.main}>
              <div className={classes.content_box1}>
                  
              <img src={props.albumImg} alt='album img' />
              <div className={classes.content_box}>
                  <p className={classes.song_name}>{props.songName}</p>
                  <div className={classes.artists_box}>
                      <span>E</span>
                  <p className={classes.artists}>{props.artists}</p>
                  </div>
              </div>
              </div>
              <button className={classes.btn}>
                  <FavoriteBorderOutlined className={classes.icon} />
              </button>
          </div>
          {/* <p className={classes.added_at}>
              <button className={classes.btn}>
                  <FavoriteBorderOutlined className={classes.icon} />
              </button>
              
             {/* {(props.liked || like.includes(props.songId)) &&  <button className={classes.fav} onClick={removeLikedHandler}>
              <FavoriteRounded className={classes.icon} />
              </button>} */}
          {/* </p>} */}
          <p className={classes.duration}>{props.duration}
          <button className={classes.btn}>
              <MoreHorizRounded className={classes.icon}/>
          </button>
          </p>
    </li>
  )
}
