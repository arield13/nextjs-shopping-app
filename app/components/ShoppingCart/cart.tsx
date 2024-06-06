import { addToCart, removeFromCart } from '@/app/store/actions/cartActions';
import { RootState } from '@/app/store/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from "@/app/interfaces/Product";
import styles from './cart.module.css';

const Cart = () => {
  const dispatch = useDispatch(); 
  const cartItems = useSelector((state: RootState) => state.cart.items); // Select cart items from the Redux store

  // Function to handle removing a product from the cart
  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId)); // Dispatch removeFromCart action
  };

  return (
    <div className={styles.cartContainer}> 
      <h2 className={styles.cartTitle}>Shopping Cart</h2> 
      <ul className={styles.cartList}>
        {cartItems?.map((item: Product) => ( 
          <li key={item.id} className={styles.cartItem}> 
            <div className={styles.productInfo}> 
              <span className={styles.productName}>{item.name}</span>
              <span className={styles.productQuantity}>Quantity: {item.quantity}</span>
              <span className={styles.productPrice}>Price: ${item.price}</span>
            </div>
            <button className={styles.removeButton} onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total Price: ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h3>
    </div>
  );
};

export default Cart;
