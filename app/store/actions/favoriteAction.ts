import { Product } from '@/app/interfaces/Product';
import { ADD_TO_FAVORITES, FETCH_FAVORITES_STORAGE, REMOVE_FROM_FAVORITES } from '../types/favoritesTypes';
import { Dispatch } from 'redux';

// Action creator to add a product to favorites
export const addToFavorites = (product: Product) => (dispatch: Dispatch) => {
  dispatch({ type: ADD_TO_FAVORITES, payload: product });
};

// Action creator to remove a product from favorites
export const removeFromFavorites = (productId: string) => (dispatch: Dispatch) => {
  dispatch({ type: REMOVE_FROM_FAVORITES, payload: productId });
};

export const fetchFavoritesFromStorage = (favorites: Product[]) => {
    return {
      type: FETCH_FAVORITES_STORAGE,
      payload: favorites,
    };
};
