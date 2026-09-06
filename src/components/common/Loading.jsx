import React from 'react';
import PropTypes from 'prop-types';
import styles from './common.module.css';

/**
 * Loading - a simple spinner shown while data is being fetched.
 */
const Loading = ({ message }) => {
  return (
    <div className={styles.loadingWrap} role="status">
      <div className={styles.spinner} />
      <p>{message}</p>
    </div>
  );
};

Loading.propTypes = {
  message: PropTypes.string
};

Loading.defaultProps = {
  message: 'Loading exercises...'
};

export default Loading;
