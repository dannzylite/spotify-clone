import React from 'react'
import classes from './CatergoryList.module.css'
import { PlayArrow } from '@material-ui/icons'
import { Link, useNavigate } from 'react-router-dom' 
import { useSelector } from 'react-redux'


export default function CatergoryList(props) {
    const navigate = useNavigate()
    const isLoggedIn = useSelector(state => state.ui.isLoggedIn)
    const scopes = 'user-read-playback-state user-modify-playback-state user-read-currently-playing'
    const CLIENT_ID = '15e362a97dc84c95a620883f7dd1d96c'
    let items
    let title
    if (props.seeAll) {
        title = props.title
        items = props.items
    } else {
        title = Object.keys(props.catergory)
        items = props.catergory[title].playlists.items.slice(0,4)
    }
    console.log(items)
    function formatDescription(description) {
        let formatedDescription = ''
        const arr = description.split(' ')
        const arr1 = description.split('.')
        // console.log(arr1)
        // const pun = '.!<'
        for (const word in description) {
            if (description[word] === '.' || description[word] === '!' || description[word] === '<') {
                formatedDescription += '.'
                break
            } else {
                formatedDescription += description[word]
            }
        }
        return formatedDescription
    }
    // formatDescription('hello world cover')
    function navigateHandler(id) {
        if (!isLoggedIn) {
            window.location.replace(`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000&scope=${scopes}`)
        }
        navigate(`/playlist/${id}`)
    }
  return (
      <div className={classes.catergory}>
          <div className={classes.header}> 
              <h2>{title}</h2>
              {!props.seeAll && <Link to={`/see-all/${title}`}>See all</Link>}
          </div>
          <div className={classes['grid-4-cols']}>
              {items.map(item => {
                //   console.log(item.images[0])
                  return <figure onClick={navigateHandler.bind(null,item.id)}>
                      <div className={classes.img_box}>
                          <img src={item.images[0].url} alt='an image' />
                      </div>
                      <p className={classes.name}>{item.name}</p>
                      <div className={classes.description_box}>
                          <p>
                              {formatDescription(item.description)}
                          </p>
                      </div>
                      <div className={classes.play}>       
                          <PlayArrow className={classes.play_arrow} />
                      </div>
                  </figure>
              })}
          </div>
    </div>
  )
}
