import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Pages.module.css';

/**
 * NotFound - catch-all 404 route. Demonstrates programmatic navigation
 * back to the home page.
 */
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFoundPage}>
      <h1>404</h1>
      <h3>Page Not Found</h3>
      <p>The page you are looking for doesn&apos;t exist or has moved.</p>
      <button className={styles.notFoundBtn} onClick={() => navigate('/')}>
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
