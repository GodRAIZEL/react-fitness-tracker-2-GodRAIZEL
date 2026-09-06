import React from 'react';
import PropTypes from 'prop-types';
import styles from './UI.module.css';

const DIFFICULTY_COLORS = {
  beginner: 'var(--track-green)',
  intermediate: 'var(--ember)',
  advanced: 'var(--cinder)'
};

/**
 * Badge - a small pill used to label an exercise's difficulty, category,
 * or an individual muscle group. Accepts children so it can be reused
 * for any short label, not just difficulty.
 */
const Badge = ({ children, difficulty }) => {
  const backgroundColor = difficulty ? DIFFICULTY_COLORS[difficulty] || 'var(--steel)' : 'var(--steel)';

  return (
    <span className={styles.badge} style={{ backgroundColor }}>
      {difficulty ? difficulty : children}
    </span>
  );
};

Badge.propTypes = {
  children: PropTypes.node,
  difficulty: PropTypes.oneOf(['beginner', 'intermediate', 'advanced'])
};

Badge.defaultProps = {
  children: null,
  difficulty: null
};

export default Badge;
