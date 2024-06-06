import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { RootState } from '@/app/store/store';
import { LOGIN_SUCCESS, LOGOUT } from '@/app/store/types/authTypes';
import styles from './Layout.module.css'; // Import CSS module for styling
import { useRouter } from 'next/router';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isAuthenticatedRedux = useSelector((state: RootState) => state.auth.isAuthenticated);
  const cartItems = useSelector((state: RootState) => state.cart.items); // Get cart items
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const isAuthenticatedLocalStorage = typeof window !== 'undefined' && localStorage.getItem('token') !== null;
    const isAuthenticated = isAuthenticatedRedux || isAuthenticatedLocalStorage;
    if (!isAuthenticated && router.pathname !== "/login") {
      router.push('/login');
    } else if (isAuthenticated) {
      let email = localStorage.getItem('email');
      let password = "";
      dispatch({ type: LOGIN_SUCCESS,  payload: { email, password }});
      if (router.pathname === "/login")
        router.push('/home');
    }
  }, [isAuthenticatedRedux, router.pathname]);

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    dispatch({ type: LOGOUT });
  };

  // Calculate total items in the cart
  const totalItemsInCart = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      <header className={styles.header}>
        <span>My Shopping Store</span>
        {isAuthenticatedRedux && <div> <span>Total Items in Cart: {totalItemsInCart}</span> <button onClick={handleLogout}>Logout</button> </div>}
      </header>
      
      {isAuthenticatedRedux && (
        <nav className={styles.nav}>
          <ul>
            <li>
              <Link href="/home">Home</Link>
            </li>
            <li>
              <Link href="/cart">Cart</Link>
            </li>
          </ul>
        </nav>
      )}
      
      <main>{children}</main>
      <footer>{/* Footer content */}</footer>
    </div>
  );
};

export default Layout;
