const initialState = {
  updatekey: true,
  hotelId: "",
  charge: 0.0,
  preordertime:"",
  preorderdate:"",
  tips: 0,
  driverinfo: [],
  driverid: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_DELIVERY_STATUS":
      return {
        ...state,
        updatekey: action.payload,
      };
    case "GET_HOTEL_ID":
      return { ...state, hotelId: action.payload };
    case "GET_DELIVERY_CHARGE":
      return { ...state, charge: action.payload };
    case "GET_PREORDER_DATE":
      return { ...state, preorderdate: action.payload };
      case "GET_PREORDER_TIME":
        return { ...state, preordertime: action.payload };
    case "GET_TIPS":
      return { ...state, tips: action.payload };
    case "DRIVER_INFO":
      return { ...state, driverinfo: action.payload };
    case "DRIVER_ID":
      return { ...state, driverid: action.payload };
      case "RESET_PREORDERDATE":
      return { ...state, preorderdate:""};
      case "RESET_PREORDERTIME":
      return { ...state,preordertime:""};
  }

  return state;
};

export default productReducer;
