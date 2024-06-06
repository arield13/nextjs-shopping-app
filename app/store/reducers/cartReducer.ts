import { ADD_TO_CART, CartActionTypes, CartState, REMOVE_FROM_CART } from '../types/cartTypes';

const initialState: CartState = {
  items: [],
};

const cartReducer = (state = initialState, action: CartActionTypes): CartState => {
  switch (action.type) {
    // Implement cases for cart-related actions (e.g., ADD_TO_CART, REMOVE_FROM_CART)   
    case ADD_TO_CART:
      const existingItem = state.items.find((item) => item.id === action.product.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.product, quantity: 1 }],
        };
      }
    case REMOVE_FROM_CART:
      return {
         ...state,
         items: state.items.filter((product) => product.id !== action.payload)
      }
    default:
      return  state;
  }
};

export default cartReducer;
