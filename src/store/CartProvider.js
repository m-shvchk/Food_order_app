import React, { useReducer } from "react";
import CartContext from "./cart-context";

const ACTIONS = {
  ADD_ITEM: "add-item",
  REMOVE_ITEM: "remove-item",
};

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_ITEM:
      const updateItems = state.items.concat(action.payload.item);
      const updatedTotalAmount =
        state.totalAmount +
        action.payload.item.price * action.payload.item.amount;
      return {
          items: updateItems,
          totalAmount: updatedTotalAmount,
      }; 
    case ACTIONS.REMOVE_ITEM:
      return {};
    default:
      return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: ACTIONS.ADD_ITEM, payload: { item: item } });
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: ACTIONS.REMOVE_ITEM, payload: { id: id } });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
