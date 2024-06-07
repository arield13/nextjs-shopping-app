import React, { useEffect, useState } from 'react';
import styles from './products.module.css';
import { ADD_TO_CART } from '@/app/store/types/cartTypes';
import { useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ADD_TO_FAVORITES, FETCH_FAVORITES_STORAGE, REMOVE_FROM_FAVORITES, REORDER_FAVORITES } from '@/app/store/types/favoritesTypes';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { Product } from '@/app/interfaces/Product';
import { FETCH_PRODUCTS_SUCCESS } from '@/app/store/types/productTypes';
import { fetchFavoritesFromStorage } from '@/app/store/actions/favoriteAction';

const ProductsList = () => {
  const [searchInput, setSearchInput] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const favoriteItems = useSelector((state: RootState) => state.favorites.items);
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();

  // Fetch products from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        dispatch({ type: FETCH_PRODUCTS_SUCCESS, products: data });
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  // Filter products based on search input
  useEffect(() => {
    const filtered = products.filter((product: Product) =>
      product.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchInput, products]);

  // Dispatch action to add product to cart
  const handleAddToCart = (product: Product) => {
    dispatch({ type: ADD_TO_CART, product: product });
  };

  // Dispatch action to add product to favorites
  const handleAddToFavorites = (product: Product) => {
    const productFiltered = products.find((item) => item.id === product.id);
    if (productFiltered && !favoriteItems.some(item => item.id === productFiltered.id)) {
      dispatch({ type: ADD_TO_FAVORITES, payload: productFiltered });
    }
  };

  // Confirm and remove product from favorites
  const handleRemoveFromFavorite = (productId: string) => {
    if (window.confirm('Are you sure you want to remove this product from favorites?')) {
      dispatch({ type: REMOVE_FROM_FAVORITES, payload: productId });
      // Remove from localStorage
      const updatedFavorites = favoriteItems.filter(item => item.id !== productId);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  // Reorder favorite items
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
  
    // Dispatch an action to reorder the favorites
    dispatch({
      type: REORDER_FAVORITES,
      startIndex: result.source.index,
      endIndex: result.destination.index,
    });
  };

  // Save favorites to localStorage
  useEffect(() => {
    if (favoriteItems.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favoriteItems));
    }
  }, [favoriteItems]);

  // Fetch favorites from localStorage
  useEffect(() => {
    if (favoriteItems.length === 0) {
      const favoriteItemsFromLocalStorage = JSON.parse(localStorage.getItem('favorites') || '[]');
      if (favoriteItemsFromLocalStorage.length > 0) {
        dispatch(fetchFavoritesFromStorage(favoriteItemsFromLocalStorage));
      }
    }
  }, [dispatch, favoriteItems]);

  // Handle drag start event
  const handleDragStart = (e: any, productId: string) => {
    e.dataTransfer.setData('text/plain', productId);
  };
  
  // Handle drag over event
  const handleDragOver = (e: any) => {
    e.preventDefault();
  };
  
  // Handle drop event
  const handleDrop = (e: any) => {
    e.preventDefault();
    const productId = e.dataTransfer.getData('text/plain');
    const draggedProduct = products.find((product) => product.id === productId);
    if (draggedProduct && !favoriteItems.some(item => item.id === draggedProduct.id)) {
      dispatch({ type: ADD_TO_FAVORITES, payload: draggedProduct });
    }
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.products}>
        <h2>Products</h2>
        <input
            type="text"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className={styles.searchInput}
          />
        <div className={styles.productList}>
          {filteredProducts.map((product: Product) => (
            <div key={product.id} className={styles.productItem} draggable="true" onDragStart={(e) => handleDragStart(e, product.id)}>
              <div>{product.name}</div>
              <div>{product.category}</div>
              <div>${product.price.toFixed(2)}</div>
              <div>
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                <button onClick={() => handleAddToFavorites(product)}>Add to Favorites</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.favorites}>
        <h2>Favorites</h2>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="favorites">
            {(provided) => (
              <div
                className={styles.cnt}
                ref={provided.innerRef}
                {...provided.droppableProps}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {favoriteItems.length === 0 && <p className={styles.dropText}>Drop products to favorites</p>}
                <ul className={styles.favoriteList}>
                  {favoriteItems.map((product, index) => (
                    <Draggable key={`favorite-${index}`} draggableId={`favorite-${index}`} index={index}>
                      {(provided) => (
                        <li
                          className={styles.favoriteItem}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                         <span>{product.name}</span>
                          <button onClick={() => handleRemoveFromFavorite(product.id)}>Remove</button>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );  
};

export default ProductsList;