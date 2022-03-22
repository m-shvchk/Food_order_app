import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isNotFiveChars = (value) => value.trim().length !== 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    address: true,
    postalCode: true,
    city: true,
  });

  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredPostalCode = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredAddressIsValid = !isEmpty(enteredAddress);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = !isNotFiveChars(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      address: enteredAddressIsValid,
      postalCode: enteredCityIsValid,
      city: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredAddressIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
        name: enteredName,
        address: enteredAddress,
        postalCode: enteredPostalCode,
        city: enteredCity,
    })

  };

  return (
    <form onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
        <label htmlFor="name">Name</label>
        <input type="text" 
        id="name" 
        placeholder="name" 
        ref={nameInputRef} 
        />
        {!formInputsValidity.name && <p>'name' field should not be empty</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.address ? '' : classes.invalid}`}>
        <label htmlFor="adress">Adress</label>
        <input
          type="text"
          id="adress"
          placeholder="adress"
          ref={addressInputRef}
        />
        {!formInputsValidity.address && <p>'address' field should not be empty</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          placeholder="postal code"
          ref={postalInputRef}
        />
        {!formInputsValidity.postalCode && <p>'postal code' field should not be empty</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`}>
        <label htmlFor="city">City</label>
        <input type="text" 
        id="city" 
        placeholder="city" 
        ref={cityInputRef} 
        />
        {!formInputsValidity.city && <p>'city' field should not be empty</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.hideCartHandler}>
          {/* type='button' so that it does not submit the form */}
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
