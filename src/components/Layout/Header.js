import React, { Fragment } from 'react'
import classes from './Header.module.css'
import mealsImage from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton'

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Reactive Food</h1>
        <HeaderCartButton showCartHandler = {props.showCartHandler}/>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="a table with food" />
      </div>
    </Fragment>
  )
}

export default Header