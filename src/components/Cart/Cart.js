import React from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal"

const Cart = (props) => {
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {[{ id: "c1", name: "pizza", amount: 2, price: 13 }].map((item) => (
        <li>{item.name}</li>
      ))}
    </ul>
  );
  return (
    <Modal hideCartHandler = {props.hideCartHandler}>
    {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>35.6</span>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick = {props.hideCartHandler}>Close</button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
