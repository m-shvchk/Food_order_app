import React from 'react'
import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";
const isEmail = (value) => value.includes("@");
const isPhone = (value) => {
    let re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
    return re.test(value);
}

const Checkout = (props) => {
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty);


  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  const {
    value: phoneValue,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    valueChangeHandler: phoneChangeHandler,
    inputBlurHandler: phoneBlurHandler,
    reset: resetPhone,
  } = useInput(isPhone);

  let formIsValid = false;

  if (firstNameIsValid && lastNameIsValid && emailIsValid && phoneIsValid) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
        return;
      }
      props.onConfirm({
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        phone: phoneValue,
      })

      resetFirstName()
      resetLastName()
      resetEmail()
      resetPhone()

  }

  const firstNameClasses = `${classes.control} ${firstNameHasError ? classes.invalid : ''}`;
  const lastNameClasses = `${classes.control} ${lastNameHasError ? classes.invalid : ''}`;
  const emailClasses = `${classes.control} ${emailHasError ? classes.invalid : ''}`;
  const phoneClasses = `${classes.control} ${phoneHasError ? classes.invalid : ''}`;


  return (
    <form onSubmit={confirmHandler}>
      <div className={firstNameClasses}>
        <label htmlFor="firstname">First Name</label>
        <input type="text" 
        id="firstname" 
        value={firstNameValue}
        onChange={firstNameChangeHandler}
        onBlur={firstNameBlurHandler} 
        />
        {firstNameHasError && <p>'first name' field should not be empty</p>}
      </div>

      <div className={lastNameClasses}>
        <label htmlFor="lastname">Last Name</label>
        <input
          type="text"
          id="lastname"
          value={lastNameValue}
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}         
        />
        {lastNameHasError && <p>'last name' field should not be empty</p>}
      </div>

      <div className={emailClasses}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={emailValue}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailHasError && <p> pleaseenter a valid email</p>}
      </div>

      <div className={phoneClasses}>
        <label htmlFor="phone">Phone</label>
        <input type="text" 
        id="phone" 
        value={phoneValue}
        onChange={phoneChangeHandler}
        onBlur={phoneBlurHandler}
        />
        {phoneHasError && <p>please enter a valid phone number</p>}
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
