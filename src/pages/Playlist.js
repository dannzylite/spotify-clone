import React, { useEffect, useRef } from 'react'
import PlayListItem from '../components/playlist/PlayListItem'
import { data } from '../Data/playlist'
import classes from './Playlist.module.css'
import { PlayArrow, FavoriteBorderOutlined, MoreHorizRounded, AccessTimeOutlined } from '@material-ui/icons'
import Header from '../components/Layout/Header'
import useObserve from '../Hooks/use-observe'
import { useParams } from 'react-router-dom'
import useHttp from '../Hooks/use-http'
import { loadPlaylist } from '../lib/request'
import getArtist from '../utils/format-artist'
import getDuration from '../utils/format-duration'

export default function Playlist() {
    const { sendRequest, data, isLoading } = useHttp(loadPlaylist, true)
    const myRef = useRef()
    const btnRef = useRef()
    const headingRef = useRef()
    const {sticky} = useObserve(myRef, '-70px')
    const { sticky: show } = useObserve(btnRef, '-150px')
    const { sticky: stick } = useObserve(headingRef, '-20px')
    const params = useParams()
    const {id} = params

    console.log(stick, 67890)
    // console.log(isLoading)

    useEffect(() => {
        console.log(9090)
        sendRequest(id)
    },[sendRequest, id])

    // if (isLoading === 'pending') {

    //     return <>
    //     <Header/>
    //     <p ref={containerRef}>Loading....
    //         <div ref={btnRef}></div>
    //     </p>
    //     </>
    // }
    // console.log(show,2332)

    // const items = data.items
    // const cover = data.cover
    // const description = data.description
    // const likes = data.likes
    // const name = data.name
    // const total = data.total
    // const color = data.color

    // console.log(items)
     

    // function getDuration(duration_min) {
    //     const duration_sec = (duration_min - Math.floor(duration_min)) * 60
    //     const duration = Math.floor(duration_min) + (Math.floor(duration_sec) / 100)
    //     return duration.toFixed(2)
    // }
    function getTime(addedAt) {
        const currentdate = new Date()
        const dateAdded = new Date(addedAt)
        const diffrence = Math.abs(currentdate - dateAdded)
        const diffDay = Math.ceil(diffrence / (1000 * 60 * 60 * 24))
        return diffDay
    }

    // const artist = items[0].track.artists

    // function getArtist(artists) {
    //     let artistsStr = ''
    //     for (let i = 0; i < artists.length; i++) {
    //         if (i > 0) {
    //             artistsStr += ', '
    //         }
    //         const name = artists[i].name
    //         artistsStr += name
    //     }
    //     return artistsStr
    // }
    // const dur = getDuration(duration_min)
    // console.log(getArtist(artist))
    
    return (
        <>
            {isLoading === 'pending' &&  <div ref={btnRef}>
        <   Header/>
        </div>
        }
            {isLoading === 'completed' &&
                <div className={classes.playlist} style={{background:`linear-gradient(${data.color} -20%,rgba(45, 43, 43, 0.731), rgba(30,30,30), rgba(20, 20,20))`}}>
                <Header sticky={sticky} color={data.color} name={data.name} show={show} />
          <header className={`${
              sticky === false ? `${classes.sticky} ${classes.header}` : classes.header
            }`} ref={myRef}>
              <img src={data.cover} alt='cover img' />
              <div className={classes.content}>
                  <p>Playlist</p>
                  <p>{data.name}</p>
                  <p>{data.description}</p>
                  <p><span>Spotify</span> &middot; {data.likes} likes &middot; {data.total} songs</p>
              </div>
          </header>
          <div  className={classes.buttons} ref={btnRef}>
              <button>
              <PlayArrow className={classes.play_arrow} />
              </button>
              <button>
                  <FavoriteBorderOutlined className={classes.icon}/>
              </button>
              <button>
                  <MoreHorizRounded className={classes.icon}/>
              </button>
          </div>
          <div className={`${
              stick === false ? `${classes.sticky} ${classes.filler}` : classes.filler
            }`} ref={headingRef}></div>   
          <div  className={`${
              stick === false ? `${classes.sticky} ${classes.headings}` : classes.headings
            }`}>
              <p>#</p>
              <p>Title</p>
              <p>Album</p>
              <p>Date Added</p>
              <p><AccessTimeOutlined /></p>
            </div>
          <ul className={`${
              stick === false ? `${classes.sticky} ${classes.lists}` : classes.lists
            }`}>
          {data.items.map((item, id) => {
              console.log(item)
              if (!item.track) {
                  return <PlayListItem
                  key={id}
                  id={id+1}
                artists={getArtist(data.items[id-1].track.artists)}
                albumImg={data.items[id-1].track.album.images[2].url}
                albumName={data.items[id-1].track.album.name}
                songName={data.items[id-1].track.name}
                duration={getDuration(data.items[id-1].track.duration_ms / 60000)}
                    addedAt={getTime(data.items[id - 1].added_at)}
                    
                    />
              }
                return <PlayListItem
                key={id}
                id={id+1}
            //       cover={cover}
            //   description={description}
            //       name={name}
            //       total={total}
            //       likes={likes}
            //       color={color}
                  artists={getArtist(item.track.artists)}
                  albumImg={item.track.album.images[2].url}
                  albumName={item.track.album.name}
                  songName={item.track.name}
                  duration={getDuration(item.track.duration_ms / 60000)}
                    addedAt={getTime(item.added_at)}
                    songId={item.track.id}
                  />
                })}
            </ul>
                </div>
            }
    </>
  )
}


















 // const albumImg = items[0].track.album.images[2].url
    // const albumName = items[0].track.album.name
    // const songName = items[0].track.name
    // const duration_min = items[0].track.duration_ms / 60000 
    // const duration_sec = (duration_min - Math.floor(duration_min)) * 60
    // const duration = Math.floor(duration_min) + (Math.floor(duration_sec) / 100)
    // const currentdate = new Date()
    // const dateAdded = new Date(items[0].added_at)
    // const diffrence = Math.abs(currentdate - dateAdded)
    // const diffDay = Math.ceil(diffrence / (1000 * 60 * 60 * 24))