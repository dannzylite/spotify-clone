import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Layout/Header";
import useObserve from "../Hooks/use-observe";
import classes from "./LikedPlaylist.module.css";
import { Add, FavoriteRounded, Home, Search, LibraryMusicRounded, MoreHorizRounded, FavoriteBorderOutlined, PlayArrow, AccessTimeOutlined} from '@material-ui/icons';
import PlayListItem from "../components/playlist/PlayListItem";

export default function LikedPlaylist() {
    const items = useSelector((state) => state.liked.items);
  const myRef = useRef();
  const btnRef = useRef();
  const { sticky } = useObserve(myRef, "-70px");
  const { sticky: show } = useObserve(btnRef, "-150px");
    // console.log(items[0].songId);
    function getTime(addedAt) {
        const currentdate = new Date()
        const dateAdded = new Date(addedAt)
        const diffrence = Math.abs(currentdate - dateAdded)
        const diffDay = Math.ceil(diffrence / (1000 * 60 * 60 * 24))
        return diffDay
    }
  return (
    <div
      className={classes.playlist}
      style={{
        background: `linear-gradient(rgb(216, 108, 216),rgb(99, 99, 179)-20%,rgba(45, 43, 43, 0.731))`,
      }}
    >
      <Header
        sticky={sticky}
        color={'purple'}
        name={'liked Songs'}
        show={show}
      />
      <header
        className={`${
          sticky === false
            ? `${classes.sticky} ${classes.header}`
            : classes.header
        }`}
        ref={myRef}
      >
              <div className={classes.img}>
              <FavoriteRounded className={classes.icon} />
        </div>
        <div className={classes.content}>
          <p>Playlist</p>
          <p>Liked Songs</p>
          <p>
            <span>Daniel Okorie</span> &middot; 
            {items.length} songs
          </p>
        </div>
          </header>
          <div  className={classes.buttons} ref={btnRef}>
              <button>
              <PlayArrow className={classes.play_arrow} />
              </button>
          </div>  
          <div  className={ classes.headings}>
              <p>#</p>
              <p>Title</p>
              <p>Album</p>
              <p>Date Added</p>
              <p><AccessTimeOutlined /></p>
          </div>
          <ul>
          {items.map((item, id) => {
            //   console.log(id+1, getArtist(item.track.artists))
                return <PlayListItem
                  key={id}
                  id={id+1}
                  artists={item.artists}
                  albumImg={item.albumImg}
                  albumName={item.albumName}
                  songName={item.songName}
                  duration={item.duration}
                  addedAt={getTime(item.addedAt)}
                  songId={item.songId}
                    liked={item.liked}
                  />
                })}
            </ul>
    </div>
  );
}
