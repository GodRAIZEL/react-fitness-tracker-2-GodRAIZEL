import React from 'react';
import PropTypes from 'prop-types';
import WorkoutLog from '../components/WorkoutLog/WorkoutLog';
import { exercisesData } from '../data/exercisesData';
import styles from './Pages.module.css';

/**
 * HistoryPage - thin page wrapper around the WorkoutLog component.
 */
const HistoryPage = ({ workoutHistory, onLogWorkout, onDeleteEntry }) => {
  const sortedHistory = [...workoutHistory].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <h1>Workout History</h1>
      <p className={styles.pageIntro}>Log completed workouts and review what you have done.</p>
      <div className="lane-divider" />
      <WorkoutLog
        exercises={exercisesData}
        history={sortedHistory}
        onLogWorkout={onLogWorkout}
        onDeleteEntry={onDeleteEntry}
      />
    </div>
  );
};

HistoryPage.propTypes = {
  workoutHistory: PropTypes.array.isRequired,
  onLogWorkout: PropTypes.func.isRequired,
  onDeleteEntry: PropTypes.func
};

HistoryPage.defaultProps = {
  onDeleteEntry: () => {}
};

export default HistoryPage;
