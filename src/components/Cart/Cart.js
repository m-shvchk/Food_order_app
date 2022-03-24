import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckoutForm, setIsCheckoutForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [error, setError] = useState(null);

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
    setIsCheckoutForm(true);
  };
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    try{
    const response = await fetch(
      "https://react-tut-http-839ca-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    if(!response.ok){
      throw new Error("Request failed")
    }
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart()
    } catch (err) {
      setError(err.message || "Something went wrong")
      setIsSubmitting(false);
    }
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

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckoutForm && (
        <Checkout
          onConfirm={submitOrderHandler}
          hideCartHandler={props.hideCartHandler}
        />
      )}
      {!isCheckoutForm && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const errorModalContent = <h2 style={{color: 'red'}}>{error}</h2>

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.hideCartHandler}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal hideCartHandler={props.hideCartHandler}>
      {!isSubmitting && !didSubmit && !error && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
      {error && errorModalContent}
    </Modal>
  );
};

export default Cart;
