export const addToCart = (product) => {

    return {
        type: 'ADD_TO_CART',
        payload: product
    }
};


export const addToHotel = (product) => {

    return {
        type: 'ADD_TO_HOTEL',
        payload: product
    }
};

export const addName = (product) => {
//alert(JSON.stringify(product))
    return {
        type: 'UPDATE_NAME_CART',
        payload: product
    }
};
export const removeFromCart = (productId) => {

    return {
        type: 'REMOVE_FROM_CART',
        payload: {
            productId: productId
        }
    }
};

export const updateCartQuantity = (productId) => {

  return {
      type: 'UPDATE_CART_QUANTITY',
      payload: {
          productId
      }
  }
};


export const ondelivery = (updatekey) => {
    return {
        type: 'UPDATE_DELIVERY_STATUS',
        payload: 
            updatekey
        
    }
  };

  export const getHotelId = (hotelId) => {
    return {
        type: 'GET_HOTEL_ID',
        payload: {
            hotelId
        }
    }
  };

  export const deliveryCharge = (charge) => {
    return {
        type: 'GET_DELIVERY_CHARGE',
        payload: charge
        
    }

  };
  export const preorderdate = (date) => {
    return {
        type: 'GET_PREORDER_DATE',
        payload: 
        date
        
    }
    

  };
  export const preordertime = (time) => {
    return {
        type: 'GET_PREORDER_TIME',
        payload: 
            time
        
    }
  };
    export const gettips = (tips) => {
        return {
            type: 'GET_TIPS',
            payload: 
                tips
            
        }
  };
  export const driverinfo = (driverinfo) => {
    return {
        type: 'DRIVER_INFO',
        payload: {
            driverinfo
        }
    }

};
export const driverId = (driverid) => {
    return {
        type: 'DRIVER_ID',
        payload: {
            driverid
        }
    }

};
export const resetcart = (item) => {
    return {
        type: 'RESET_CART',
        payload: item
    }
};
  
export const resetpreorderdate = (item) => {
    return {
        type: 'RESET_PREORDERDATE',
        payload: item
    }
};

export const resetpreordertime = (item) => {
    return {
        type: 'RESET_PREORDERTIME',
        payload: item
    }
};