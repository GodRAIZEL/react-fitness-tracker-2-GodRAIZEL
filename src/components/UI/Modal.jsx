import React from 'react';
import PropTypes from 'prop-types';
import styles from './UI.module.css';

/**
 * Modal - a reusable overlay dialog that renders whatever is passed as
 * children. Demonstrates the children/composition pattern and a
 * custom event handler (onClose) passed down as a prop.
 */
const Modal = ({ title, children, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
      >
        <div className={styles.modalHeader}>
          <h3>{title}</h3>
          <button className={styles.modalCloseBtn} onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
};

Modal.defaultProps = {
  title: ''
};

export default Modal;
