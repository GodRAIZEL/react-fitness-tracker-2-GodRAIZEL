import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../UI/Button';
import LogEntry from './LogEntry';
import EmptyState from '../common/EmptyState';
import { getTodayISO } from '../../utils/helpers';
import styles from './WorkoutLog.module.css';

/**
 * WorkoutLog - a form for logging a completed workout (sets/reps/weight)
 * plus a list of past log entries. Demonstrates a controlled multi-field
 * form, onSubmit handling, and complex object state.
 */
const WorkoutLog = ({ exercises, history, onLogWorkout, onDeleteEntry }) => {
  const [currentLog, setCurrentLog] = useState({
    exerciseId: exercises[0] ? exercises[0].id : '',
    sets: 3,
    reps: 10,
    weight: 0,
    date: getTodayISO()
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const exercise = exercises.find((ex) => ex.id === parseInt(currentLog.exerciseId, 10));
    if (!exercise) return;

    onLogWorkout({
      id: Date.now(),
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      sets: Number(currentLog.sets),
      reps: Number(currentLog.reps),
      weight: Number(currentLog.weight),
      date: currentLog.date,
      caloriesBurn: exercise.caloriesBurn
    });

    // Reset just the numeric fields, keep the selected exercise/date for convenience.
    setCurrentLog((prev) => ({ ...prev, sets: 3, reps: 10, weight: 0 }));
  };

  return (
    <div className={styles.logWrap}>
      <form className={styles.logForm} onSubmit={handleSubmit}>
        <h3>Log a Workout</h3>

        <label>
          Exercise
          <select
            value={currentLog.exerciseId}
            onChange={(e) => setCurrentLog({ ...currentLog, exerciseId: e.target.value })}
          >
            {exercises.map((ex) => (
              <option key={ex.id} value={ex.id}>{ex.name}</option>
            ))}
          </select>
        </label>

        <div className={styles.formRow}>
          <label>
            Sets
            <input
              type="number"
              min="1"
              value={currentLog.sets}
              onChange={(e) => setCurrentLog({ ...currentLog, sets: e.target.value })}
            />
          </label>
          <label>
            Reps
            <input
              type="number"
              min="1"
              value={currentLog.reps}
              onChange={(e) => setCurrentLog({ ...currentLog, reps: e.target.value })}
            />
          </label>
          <label>
            Weight (kg)
            <input
              type="number"
              min="0"
              value={currentLog.weight}
              onChange={(e) => setCurrentLog({ ...currentLog, weight: e.target.value })}
            />
          </label>
        </div>

        <label>
          Date
          <input
            type="date"
            value={currentLog.date}
            onChange={(e) => setCurrentLog({ ...currentLog, date: e.target.value })}
          />
        </label>

        <Button type="submit" fullWidth>Log Workout</Button>
      </form>

      <div className={styles.historySection}>
        <h4>Recent Workouts</h4>
        {history.length === 0 ? (
          <EmptyState message="No workouts logged yet. Start tracking your progress!" />
        ) : (
          <ul className={styles.historyList}>
            {history.map((entry) => (
              <LogEntry key={entry.id} entry={entry} onDelete={onDeleteEntry} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

WorkoutLog.propTypes = {
  exercises: PropTypes.array.isRequired,
  history: PropTypes.array.isRequired,
  onLogWorkout: PropTypes.func.isRequired,
  onDeleteEntry: PropTypes.func
};

WorkoutLog.defaultProps = {
  onDeleteEntry: () => {}
};

export default WorkoutLog;
