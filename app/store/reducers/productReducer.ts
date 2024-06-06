import { FETCH_PRODUCTS_SUCCESS, ProductState } from "../types/productTypes";
import { ProductActionTypes } from "../types/productTypes";


const initialState: ProductState = {
  products: [],
};

const productReducer = (state = initialState, action: ProductActionTypes): ProductState => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.products
    }
    default:
      return state;
  }
};

export default productReducer;
