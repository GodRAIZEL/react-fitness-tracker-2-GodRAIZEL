import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/exercises', label: 'Exercises' },
  { to: '/workout-planner', label: 'Planner' },
  { to: '/history', label: 'History' },
  { to: '/progress', label: 'Progress' }
];

/**
 * Navbar - fixed header with route links, active-route styling and a
 * hamburger toggle for mobile. Demonstrates useLocation, conditional
 * className, and an onClick handler that toggles local state.
 */
const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Auto-close the mobile menu whenever the route changes, so it never
  // stays open after the user taps a link and lands on a new page.
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path));

  return (
    <nav className={styles.navbar}>
      <div className={styles.navInner}>
        <Link to="/" className={styles.brand} onClick={() => setIsOpen(false)}>
          PACE
        </Link>

        <button
          className={styles.hamburger}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`${styles.navLinks} ${isOpen ? styles.navLinksOpen : ''}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={isActive(link.to) ? styles.active : ''}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
