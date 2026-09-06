import React from 'react';
import PropTypes from 'prop-types';
import { calculateTotalWeight } from '../../utils/helpers';
import styles from './WorkoutLog.module.css';

/**
 * LogEntry - a single row in the workout history list.
 */
const LogEntry = ({ entry, onDelete }) => {
  const totalWeight = calculateTotalWeight(entry);

  return (
    <li className={styles.logEntry}>
      <div>
        <strong>{entry.exerciseName}</strong>
        <p className={styles.logMeta}>
          {entry.date} &middot; {entry.sets} sets &times; {entry.reps} reps
          {entry.weight > 0 && ` @ ${entry.weight}kg`}
        </p>
      </div>
      <div className={styles.logRight}>
        {totalWeight > 0 && <span className="mono-stat">{totalWeight}kg total</span>}
        <button onClick={() => onDelete(entry.id)} aria-label={`Delete log for ${entry.exerciseName}`}>
          &times;
        </button>
      </div>
    </li>
  );
};

LogEntry.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.number.isRequired,
    exerciseName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    sets: PropTypes.number.isRequired,
    reps: PropTypes.number.isRequired,
    weight: PropTypes.number
  }).isRequired,
  onDelete: PropTypes.func.isRequired
};

export default LogEntry;
