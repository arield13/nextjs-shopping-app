import { Product } from "@/app/interfaces/Product";

// Define action type constants
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

// Define action interfaces
interface AddToCartAction {
  type: typeof ADD_TO_CART;
  product: Product;
}

interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: string; // Assuming product ID is used for removal
}

// Define a union type for all possible action types
export type CartActionTypes = AddToCartAction | RemoveFromCartAction;

// Define state type for cart
export interface CartState {
  items: Product[];
}
