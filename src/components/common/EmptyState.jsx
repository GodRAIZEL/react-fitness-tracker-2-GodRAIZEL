import React from 'react';
import PropTypes from 'prop-types';
import styles from './common.module.css';

/**
 * EmptyState - shown whenever a list has no items to display
 * (no search results, no workout history yet, an empty day, etc).
 */
const EmptyState = ({ message, actionLabel, onAction }) => {
  return (
    <div className={styles.emptyState}>
      <p>{message}</p>
      {actionLabel && onAction && (
        <button className={styles.emptyStateAction} onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

EmptyState.propTypes = {
  message: PropTypes.string.isRequired,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func
};

EmptyState.defaultProps = {
  actionLabel: null,
  onAction: null
};

export default EmptyState;
