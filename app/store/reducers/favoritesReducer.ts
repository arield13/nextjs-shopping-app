import { ADD_TO_FAVORITES, FETCH_FAVORITES_STORAGE, FavoritesActionTypes, FavoritesState, REMOVE_FROM_FAVORITES, REORDER_FAVORITES } from '../types/favoritesTypes';

const initialState: FavoritesState = {
  items: []
};

const favoritesReducer = (state = initialState, action: FavoritesActionTypes): FavoritesState => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case FETCH_FAVORITES_STORAGE:
        return {
          ...state,
          items: action.payload
      }
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        items: state.items.filter((product) => product.id !== action.payload)
      };
    case REORDER_FAVORITES:
        const { startIndex, endIndex } = action;
        const reorderedFavorites = Array.from(state.items);
        const [reorderedItem] = reorderedFavorites.splice(startIndex, 1);
        reorderedFavorites.splice(endIndex, 0, reorderedItem);
        return {
          ...state,
          items: reorderedFavorites,
        };
    default:
      return state;
  }
};

export default favoritesReducer;
