import React from 'react'
import { Add, FavoriteRounded, Home, Search, LibraryMusicRounded} from '@material-ui/icons';
import classes from './SideBar.module.css'
import { NavLink } from 'react-router-dom';


export default function SideBar() {
  return (
    <div className={classes.sidebar}>
      <div className={classes.header}>
        <h2>Spotify</h2>
      </div>
      <ul>
        <li>
          <NavLink to='/' className={navData => navData.isActive ? classes.active : ''}>
            <Home className={classes.icon} />
            <p>
            Home
            </p>
          </NavLink>
        </li>
        <li>
          <NavLink to='/search' className={navData => navData.isActive ? classes.active : ''}>
            <Search className={classes.icon} />
            <p>
            Search
            </p>
          </NavLink>
        </li>
        <li>
          <NavLink to='/home' className={navData => navData.isActive ? classes.active : ''}>
            <LibraryMusicRounded className={classes.icon} />
            <p>
            Library
            </p>
          </NavLink>
        </li>
        <li className={classes.filler}>
        </li>
        <li>
          <button className={classes.playlist_btn}>
          <div className={classes.playlist}>
            <Add className={classes.icon}/>
            </div>
            <p>
            Create Playlist
            </p>
          </button>
        </li>
        <li>
          <NavLink to='/liked' className={navData => navData.isActive ? classes.active : ''}>
          <div className={classes.liked}>
           <FavoriteRounded className={classes.icon} />
            </div>
            <p> 
            Liked Song
            </p>
          </NavLink>
        </li>
      </ul>
      <div className={classes.download}>
        <ion-icon name="arrow-down-circle-outline" style={{color:'#d7d7d7', fontSize:'2.4rem'}}></ion-icon>
        <p>Install App</p>
      </div>
    </div>
  )
}
