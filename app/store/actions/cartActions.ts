import { Product } from "@/app/interfaces/Product";

export const addToCart = (product: Product) => ({
    type: 'ADD_TO_CART',
    payload: product,
});
  
export const removeFromCart = (productId: string) => ({
  type: 'REMOVE_FROM_CART',
  payload: productId,
});
  