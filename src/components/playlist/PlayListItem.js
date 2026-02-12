import React, { useState } from 'react'
import classes from './PlayListItem.module.css'
import { PlayArrow, Pause, FavoriteBorderOutlined, MoreHorizRounded, FavoriteRounded } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { likedActions } from '../../store/liked-slice'
import { playerActions } from '../../store/player-slice'
import SpotifyWebApi from 'spotify-web-api-node'
import { uiActions } from '../../store/ui-slice'

const spotify = new SpotifyWebApi()

export default function PlayListItem(props) {
    const like = useSelector(state => state.liked.likedSongs)
    const isPlaying = useSelector(state => state.ui.isPlaying)
    const playing = useSelector(state => state.ui.playing)
    const [continueSong] = useState(false)
    console.log(like, 888)
    const dispatch = useDispatch()
    spotify.setAccessToken(window.localStorage.getItem('token'));
    
    function addToLikedHandler() {
        dispatch(likedActions.addToLiked({
            id: props.id,
            songName: props.songName,
            artists: props.artists,
            albumName: props.albumName,
            albumImg: props.albumImg,
            addedAt: new Date(),
            duration: props.duration,
            songId: props.songId,
            liked: true
        }))
        dispatch(likedActions.setLikedSongs(props.songId))
    }
    function removeLikedHandler() {
        console.log('removeee2')
        dispatch(likedActions.removeFromLiked(props.songId))
        dispatch(likedActions.removeLikedSong(props.songId))
    }

    function addPlayerHandler() {
        console.log('songId', props.songId)
        if (continueSong) {
            continueSongHandler()
        } else {
            playHandler(props.songId)  
        }
        dispatch(uiActions.play(props.songId))
        dispatch(playerActions.addPlayer({
            id: props.id,
            songName: props.songName,
            artists: props.artists,
            albumImg: props.albumImg,
            duration: props.duration,
            songId: props.songId
        }))
    }

    function pauseHandler(id) {
        // setContinueSong(true)
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

    function playHandler(id) {
        console.log('songId', props.songId)
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
  return (
      <li className={classes.content}>
          <p className={classes.id}><span>{props.id}</span>
            {(!isPlaying || playing !== props.songId) && <button onClick={addPlayerHandler}>
            <PlayArrow className={classes.play_arrow} />
            </button>}
              {(isPlaying && playing === props.songId )&& <button onClick={pauseHandler.bind(null, props.songId)}>
                <Pause className={classes.play_arrow} />
              </button>}
          </p>
          <div className={classes.main}>
              <img src={props.albumImg} alt='album img' />
              <div className={classes.content_box}>
                  <p className={classes.song_name}>{props.songName}</p>
                  <div className={classes.artists_box}>
                  <span>E</span>
                  <p className={classes.artists}>{props.artists}</p>
                  </div>
              </div>
          </div>
          <div className={classes.album_box}>
            <p className={classes.album_name}>{props.albumName}</p>
          </div>
          <p className={classes.added_at}>{props.addedAt} days ago
              {!props.liked && !like.includes(props.songId) && <button className={classes.btn} onClick={addToLikedHandler}>
                  <FavoriteBorderOutlined className={classes.icon} />
              </button>
              }
             {(props.liked || like.includes(props.songId)) &&  <button className={classes.fav} onClick={removeLikedHandler}>
              <FavoriteRounded className={classes.icon} />
              </button>}
          </p>
          <p className={classes.duration}>{props.duration}
          <button className={classes.btn}>
              <MoreHorizRounded className={classes.icon}/>
          </button>
          </p>
    </li>
  )
}
