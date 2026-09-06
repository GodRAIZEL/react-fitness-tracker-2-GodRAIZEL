import React from 'react';
import PropTypes from 'prop-types';
import styles from './UI.module.css';

/**
 * Button - a reusable button with primary/secondary/danger variants.
 * Demonstrates: props destructuring, default props, conditional styling,
 * expressions as props (className), and children as a fallback label.
 */
const Button = ({ children, variant, onClick, type, disabled, fullWidth }) => {
  const variantClass = styles[`btn-${variant}`] || styles['btn-primary'];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.btn} ${variantClass} ${fullWidth ? styles['btn-full'] : ''}`}
      style={disabled ? { opacity: 0.55, cursor: 'not-allowed' } : undefined}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool
};

Button.defaultProps = {
  variant: 'primary',
  onClick: () => {},
  type: 'button',
  disabled: false,
  fullWidth: false
};

export default Button;
