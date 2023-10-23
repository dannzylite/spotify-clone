import { OpenInNew } from '@material-ui/icons'
import React from 'react'
import { useDispatch } from 'react-redux'
import { uiActions } from '../../store/ui-slice'
import classes from './Option.module.css'

export default function Option(props) {
    const options = ['Account', 'Profile', 'Support', 'Download', 'Logout']
    const dispatch = useDispatch()
    function logoutHandler() {
        console.log('outt')
        dispatch(uiActions.logout())
    }
  return (
      <ul className={classes.option}>
          {options.map(option => {
              if (option === 'Download' || option === 'Account' || option === 'Support') {
                  return <li>
                      <p>{option}</p>
                      <OpenInNew  className={classes.icon}/>
                  </li>
              }
              if (option === 'Logout') {
                // console.log('outt')
                  return <li onClick={logoutHandler}>{option}</li>
              }
              return <li>{option}</li>
          })}   
    </ul>
  )
}
