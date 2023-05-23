const initialState = {
  hotel: [],
  name: [],
};

const hotelReducer = (state = initialState, action) => {
  let hotel = state.hotel;
  let name = state.name;
  switch (action.type) {
    case "ADD_TO_HOTEL":
      // alert("actionpayload   =>" + JSON.stringify(action.payload));
      hotel.push(action.payload);

      return {
        ...state,
        hotel: action.payload,
      };
    case "UPDATE_HOTEL":
      console.log("cart   =>" + JSON.stringify(hotel));

      let item = hotel.find((item) => item.id === action.payload.productId);

      let newCart = hotel.filter(
        (item) => item.id !== action.payload.productId
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
        hotel: newCart,
      };

    case "REMOVE_HOTEL":
      return {
        ...state,
        hotel: hotel.filter((item) => item.id !== action.payload.productId),
      };

    case "UPDATE_NAME_CART":
      // alert("actionpayload   =>" + JSON.stringify(action.payload));
      name.push(action.payload);
      return {
        ...state,
        name: name,
      };
    default:
      return state;
  }
};

export default hotelReducer;
