import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);

  const cartCtx = useContext(CartContext);
  const totalAmount = Math.abs(cartCtx.totalAmount.toFixed(2));
  // Math.abs prevents from total amount of '-0.00'
  const hasItems = cartCtx.items.length > 0;

  const itemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const itemDeleteHandler = (id) => {
    cartCtx.deleteItem(id);
  };
  const itemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };
  const orderHandler = () => {
    setIsCheckout(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={itemRemoveHandler.bind(null, item.id)} // same as onRemove={() => itemRemoveHandler(item.id)}
          onAdd={itemAddHandler.bind(null, item)} // same as onAdd={() => itemAddHandler(item)}
          onDelete={() => itemDeleteHandler(item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button
        className={classes["button--alt"]}
        onClick={props.hideCartHandler}
      >
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal hideCartHandler={props.hideCartHandler}>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout hideCartHandler={props.hideCartHandler}/>}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
