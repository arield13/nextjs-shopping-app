import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LOGIN_SUCCESS } from '@/app/store/types/authTypes';
import { authService } from '@/app/services/authServices';
import styles from './LoginPage.module.css';


/**
 * Login page allows users to log in by providing their email and password.
 */
const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) =>  {
    e.preventDefault();
    setLoginMessage("");
    authService.login({ email, password })
      .then((result) => {
        if (result) {
          dispatch({ type: LOGIN_SUCCESS,  payload: { email, password }});
        } else {
          setLoginMessage("User not found!");
        }
      });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className={styles.input} />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={styles.input} />
        <div><p className={styles.error}>{loginMessage}</p></div>
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
