// THIS CONTEXT HANDLES SHOPPING CART-RELATED STATE AND EVENTS

import React, { createContext, useState, useReducer, useEffect } from "react";

export const CartContext = createContext(null);

const initialCartState = {
  user: null,
  items: [],
};

// this reducer function will govern changes to the cart's state
function cartReducer(cartState, action) {
  switch (action.type) {
    case "LOAD-CART-FROM-LOCAL-STORAGE":
      return {
        ...cartState,
        user: action.userPayload,
        items: action.itemsPayload,
      };
    case "ADD-TO-CART":
      return {
        ...cartState,
        items: [...cartState.items, action.payload],
      };
    case "INCREASE-QUANTITY":
      return {
        ...cartState,
        items: action.payload,
      };
    case "DECREASE-QUANTITY":
      return {
        ...cartState,
        items: action.payload,
      };
    case "REMOVE-FROM-CART":
      return {
        ...cartState,
        items: action.payload,
      };
    case "RESET-CART":
      return {
        ...cartState,
        items: initialCartState.items,
      };
    default:
      console.log("Error");
      return cartState;
  }
}

export const CartProvider = ({ children }) => {
  // this is the state which keeps track of the cart
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCartState);
  const [info, setInfo] = useState("");

  // update cartState's initial state based on local storage
  useEffect(() => {
    // checks local storage for cartState
    let retrievedCart = JSON.parse(window.localStorage.getItem("cart-state"));

    if (retrievedCart) {
      cartDispatch({
        type: "LOAD-CART-FROM-LOCAL-STORAGE",
        userPayload: retrievedCart.user,
        itemsPayload: retrievedCart.items,
      });
    }
  }, []);

  useEffect(() => {
    pushCartToLocalStorage(cartState);
  }, [cartState]);

  // calling this function pushes cartState to localStorage
  function pushCartToLocalStorage(shoppingCart) {
    window.localStorage.setItem("cart-state", JSON.stringify(shoppingCart));
  }
  // calling this function removes cartState from localStorage
  function removeCartFromLocalStorage() {
    window.localStorage.removeItem("cart-state");
  }

  // the following functions manipulate cartState by calling dispatch
  // they also ensure that cartState is updated synchronously
  function addToCart(val) {
    let arrayOfDuplicate = [];
    let newCartState = cartState;
    let targetItem;
    let targetItemPosition;

    for (let i = 0; i < newCartState.items.length; i++) {
      if (newCartState.items[i]._id === val._id) {
        arrayOfDuplicate.push(newCartState.items[i]._id);
        targetItemPosition = i;
      }
    }

    if (arrayOfDuplicate.length > 0) {
      newCartState.items.forEach((el) => {
        if (el._id === arrayOfDuplicate[0]) {
          targetItem = el;
          targetItem.quantityInCart += 1;
        }
      });
      newCartState.items.splice(targetItemPosition, 1);
      newCartState.items.splice(targetItemPosition, 0, targetItem);
      cartDispatch({ type: "INCREASE-QUANTITY", payload: newCartState.items });
    } else {
      cartDispatch({ type: "ADD-TO-CART", payload: val });
      // console.log("after add: ", cartState);
    }
  }

  function removeFromCart(val) {
    let newCartState = cartState;
    let targetItem;
    let targetItemPosition;

    for (let i = 0; i < newCartState.items.length; i++) {
      if (newCartState.items[i]._id === val._id) {
        targetItemPosition = i;
      }
    }

    if (newCartState.items[targetItemPosition].quantityInCart <= 1) {
      newCartState.items.splice(targetItemPosition, 1);
      cartDispatch({ type: "REMOVE-FROM-CART", payload: newCartState.items });
    } else {
      newCartState.items.forEach((el) => {
        if (el._id === newCartState.items[targetItemPosition]._id) {
          targetItem = el;
          targetItem.quantityInCart -= 1;
        }
      });
      newCartState.items.splice(targetItemPosition, 1);
      newCartState.items.splice(targetItemPosition, 0, targetItem);
      cartDispatch({ type: "DECREASE-QUANTITY", payload: newCartState.items });
    }
  }

  function resetCart() {
    cartDispatch({ type: "RESET-CART" });
    removeCartFromLocalStorage();
  }

  return (
    <CartContext.Provider
      value={{
        cartState,
        addToCart,
        removeFromCart,
        resetCart,
        info,
        setInfo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
