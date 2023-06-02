import productReducer from './productReducer';
import cartReducer from './cartReducer';
import { combineReducers } from 'redux';
import hotelReducer from './hotelReducer';


// convert object to string and store in localStorage


// listen for store changes and use saveToLocalStorage to
// save them to localStorage

const rootReducer = combineReducers({
    product: productReducer,
    cart: cartReducer,
    hotel:hotelReducer,
    name:hotelReducer
});


export default rootReducer;