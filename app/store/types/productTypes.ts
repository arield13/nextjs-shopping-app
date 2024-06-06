import { Product } from "@/app/interfaces/Product";

// Define action type constants
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';

// Define action interfaces
interface FetchProductsSuccessAction {
  type: typeof FETCH_PRODUCTS_SUCCESS;
  products: Product[]; // Assuming Product type is defined elsewhere
}

// Define a union type for all possible action types
export type ProductActionTypes = FetchProductsSuccessAction;

// Define state type for products
export interface ProductState {
  products: Product[]; // Assuming Product type is defined elsewhere
}
