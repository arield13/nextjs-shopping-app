import { Product } from "@/app/interfaces/Product";

// Define action type constants
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const FETCH_FAVORITES_STORAGE = 'FETCH_FAVORITES_STORAGE';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const REORDER_FAVORITES = 'REORDER_FAVORITES';

// Define action interfaces
interface AddToFavoritesAction {
  type: typeof ADD_TO_FAVORITES;
  payload: Product; // Assuming Product type is defined elsewhere
}

// Define action interfaces
interface FetchFavoritesStorage {
  type: typeof FETCH_FAVORITES_STORAGE;
  payload: Product[]; // Assuming Product type is defined elsewhere
}

// Define action interfaces
interface ReorderToFavoritesAction {
  type: typeof REORDER_FAVORITES;
  startIndex: number,
  endIndex: number,
  payload: Product;
}

interface RemoveFromFavoritesAction {
  type: typeof REMOVE_FROM_FAVORITES;
  payload: string;
}

// Define a union type for all possible action types
export type FavoritesActionTypes = AddToFavoritesAction | ReorderToFavoritesAction | RemoveFromFavoritesAction | FetchFavoritesStorage;

// Define state type for favorites
export interface FavoritesState {
  items: Product[];
}
