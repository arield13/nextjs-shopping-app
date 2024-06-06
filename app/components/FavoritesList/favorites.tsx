import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { REMOVE_FROM_FAVORITES } from '@/app/store/types/favoritesTypes';

const Favorites = () => {
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const dispatch = useDispatch();

  const handleRemoveFromFavorite = (productId: string) => {
    if (window.confirm('Are you sure you want to remove this product from favorites?')) {
      dispatch({ type: REMOVE_FROM_FAVORITES, payload: productId });
    }
  };

  return (
    <div>
      <h2>Favorites</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <ul>
          {favorites.map((product) => (
            <li key={product.id}>
              <span>{product.name}</span>
              <button onClick={() => handleRemoveFromFavorite(product.id)}>Remove from Favorites</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
