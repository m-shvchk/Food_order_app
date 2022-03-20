import React from 'react'
import classes from './Checkout.module.css'

const Checkout = (props) => {

    const confirmHandler = (event) => {
        event.preventDefault()

    } 

    return (
        <form onSubmit={confirmHandler}>
            <div className={classes.control}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="name" />
            </div>
            <div className={classes.control}>
                <label htmlFor="adress">Adress</label>
                <input type="text" id="adress" placeholder="adress" />
            </div>
            <div className={classes.control}>
                <label htmlFor="postal">Postal Code</label>
                <input type="text" id="postal" placeholder="postal code" />
            </div>
            <div className={classes.control}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" placeholder="city" />
            </div>
            <button type="button" onClick={props.hideCartHandler}>Cancel</button> 
            {/* type='button' so that it does not submit the form */}
            <button>Confirm</button>

        </form>
    )

}

export default Checkout