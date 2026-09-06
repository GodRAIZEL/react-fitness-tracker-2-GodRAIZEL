import React from 'react';
import styles from './common.module.css';

/**
 * Footer - static site footer shown on every route.
 */
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span className={styles.footerBrand}>PACE</span>
        <span>&copy; {year} Fitness Tracker &amp; Workout Planner. Built for a stronger you.</span>
      </div>
    </footer>
  );
};

export default Footer;
