import React from "react";
import Header from "../components/Layout/Header";
import { useSelector } from "react-redux";
import classes from "./Search.module.css";
import SearchItem from "../components/search/SearchItem";
import CatergoryList from "../components/catergories/CatergoryList";
import { caterogries } from "../Data/data";
import { Link } from "react-router-dom";
import { PlayArrow } from "@material-ui/icons";

export default function Search() {
  const songs = useSelector((state) => state.search.searched);
  const title = Object.keys(caterogries);
  console.log(caterogries);
  function getRandomColor() {
    const color = [
      "#6741d9",
      "#9c36b5",
      "#c2255c",
      "#3b5bdb",
      "#1971c2",
      "#0c8599",
    ];
    const random = Math.floor(Math.random() * color.length);
    return color[random];
  }
  return (
    <div>
      <Header search={true} />
      {songs.length > 0 && (
        <div className={classes.search}>
          <div>
            <p className={classes.head}>Top Result</p>
            <div className={classes.content}>
              <img src={songs[0].albumImg} />
              <p className={classes.artist}>{songs[0].artists}</p>
              <p className={classes.text}>Artist</p>
            <button className={classes.play}>
              <PlayArrow className={classes.play_arrow} />
            </button>
            </div>
          </div>
          <div>
            <p className={classes.song_text}>Song</p>
            <ul>
              {songs.map((song) => (
                <SearchItem
                  artists={song.artists}
                  albumImg={song.albumImg}
                  songName={song.songName}
                  duration={song.duration}
                  songId={song.songId}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
      <div className={classes.caterogries}>
        <ul className={classes.lists}>
          {caterogries.map((item, id) => {
            console.log(item[id]);
            const title = Object.keys(item);
            return (
              <Link to={`/see-all/${title}`}>
                <div
                  className={classes.catergory}
                  style={{ backgroundColor: `${getRandomColor()}` }}
                >
                  {title}
                </div>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
