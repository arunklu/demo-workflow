const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  let cart = state.cart;
  switch (action.type) {
    case "ADD_TO_CART":
      //console.log("actionpayload   =>" + JSON.stringify(action.payload));
      localStorage.setItem("cart", JSON.stringify(action.payload));
      let data = JSON.parse(localStorage.getItem("cart"));
      cart.push(JSON.parse(localStorage.getItem("cart")));
      return {
        ...state,
        cart: cart,
      };
    case "UPDATE_CART_QUANTITY":
      console.log("cart   =>" + JSON.stringify(cart));

      let item = cart.find(
        (item) => item.cartindex === action.payload.productId
      );

      let newCart = cart.filter(
        (item) => item.cartindex !== action.payload.productId
      );

      item.qty = item.qty + 1;
      console.log(item.qty);

      item.amount = parseFloat(
        item.qty * parseFloat(item.price).toFixed(2)
      ).toFixed(2);

      console.log(item.amount);

      newCart.push(item);

      return {
        ...state,
        cart: newCart,
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: cart.filter(
          (item) => item.cartindex !== action.payload.productId
        ),
      };

    case "UPDATE_NAME_CART":
      return {
        ...state,
        cart: cart.filter(
          (item) => item.cartindex !== action.payload.productId
        ),
      };

    case "RESET_CART":
      return { ...state, cart: [] };

    default:
      return state;
  }
};

export default cartReducer;
