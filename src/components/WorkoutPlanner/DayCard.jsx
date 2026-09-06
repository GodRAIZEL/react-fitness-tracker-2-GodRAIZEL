import React from 'react';
import PropTypes from 'prop-types';
import EmptyState from '../common/EmptyState';
import styles from './WorkoutPlanner.module.css';

/**
 * DayCard - represents a single day in the weekly planner. Reused 7
 * times by WorkoutPlanner (grandchild of App -> WorkoutPlannerPage ->
 * WorkoutPlanner -> DayCard), demonstrating 3+ levels of nesting.
 */
const DayCard = ({ day, dayLabel, exercises, onRemoveExercise, onClearDay }) => {
  const isToday = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() === day;

  return (
    <div
      className={styles.dayCard}
      style={{ borderTopColor: isToday ? 'var(--ember)' : 'var(--chalk-dim)' }}
    >
      <div className={styles.dayHeader}>
        <h4>{dayLabel}</h4>
        <span className="mono-stat">{exercises.length}</span>
      </div>

      {exercises.length === 0 ? (
        <EmptyState message="No exercises planned yet." />
      ) : (
        <ul className={styles.exerciseList}>
          {exercises.map((exercise) => (
            <li key={exercise.id} className={styles.exerciseItem}>
              <span>{exercise.name}</span>
              <button onClick={() => onRemoveExercise(exercise.id)} aria-label={`Remove ${exercise.name}`}>
                &times;
              </button>
            </li>
          ))}
        </ul>
      )}

      {exercises.length > 0 && (
        <button className={styles.clearDayBtn} onClick={onClearDay}>
          Clear Day
        </button>
      )}
    </div>
  );
};

DayCard.propTypes = {
  day: PropTypes.string.isRequired,
  dayLabel: PropTypes.string.isRequired,
  exercises: PropTypes.array.isRequired,
  onRemoveExercise: PropTypes.func.isRequired,
  onClearDay: PropTypes.func.isRequired
};

export default DayCard;
