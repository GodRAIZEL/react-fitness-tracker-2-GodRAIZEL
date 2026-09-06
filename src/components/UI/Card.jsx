import React from 'react';
import PropTypes from 'prop-types';
import styles from './UI.module.css';

/**
 * Card - a generic content container demonstrating the composition
 * pattern via the `children` prop, plus optional hover/selected styling.
 */
const Card = ({ children, isSelected, onClick, padded }) => {
  return (
    <div
      className={`${styles.card} ${isSelected ? styles['card-selected'] : ''}`}
      style={{ padding: padded ? '20px' : '0' }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
  padded: PropTypes.bool
};

Card.defaultProps = {
  isSelected: false,
  onClick: undefined,
  padded: true
};

export default Card;
