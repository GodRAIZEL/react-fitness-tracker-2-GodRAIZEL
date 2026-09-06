import React from 'react';
import PropTypes from 'prop-types';
import ProgressChart from '../components/WorkoutLog/ProgressChart';
import EmptyState from '../components/common/EmptyState';
import { DAYS_OF_WEEK } from '../data/exercisesData';
import { calculateStreak, calculateTotalCalories } from '../utils/helpers';
import styles from './Pages.module.css';

/**
 * ProgressPage - shows scoreboard-style summary stats plus a bar chart
 * of workouts logged per weekday, calculated from workoutHistory.
 */
const ProgressPage = ({ workoutHistory, workoutPlan }) => {
  const streak = calculateStreak(workoutHistory);
  const totalCalories = calculateTotalCalories(workoutHistory);
  const totalPlanned = DAYS_OF_WEEK.reduce((total, day) => total + workoutPlan[day].length, 0);

  return (
    <div>
      <h1>Your Progress</h1>
      <p className={styles.pageIntro}>A scoreboard view of how consistent you have been.</p>
      <div className="lane-divider" />

      <section className={styles.scoreboard}>
        <div className={styles.scoreCell}>
          <span className={`mono-stat ${styles.scoreNumber}`}>{streak}</span>
          <span className={styles.scoreLabel}>Day Streak</span>
        </div>
        <div className={styles.scoreCell}>
          <span className={`mono-stat ${styles.scoreNumber}`}>{workoutHistory.length}</span>
          <span className={styles.scoreLabel}>Total Workouts</span>
        </div>
        <div className={styles.scoreCell}>
          <span className={`mono-stat ${styles.scoreNumber}`}>{totalPlanned}</span>
          <span className={styles.scoreLabel}>Exercises This Week</span>
        </div>
        <div className={styles.scoreCell}>
          <span className={`mono-stat ${styles.scoreNumber}`}>{totalCalories}</span>
          <span className={styles.scoreLabel}>Calories Burned</span>
        </div>
      </section>

      <h4 className={styles.sectionTitle}>Workouts This Week</h4>
      {workoutHistory.length > 0 ? (
        <ProgressChart history={workoutHistory} />
      ) : (
        <EmptyState message="Log a workout to start seeing your progress chart." />
      )}
    </div>
  );
};

ProgressPage.propTypes = {
  workoutHistory: PropTypes.array.isRequired,
  workoutPlan: PropTypes.object.isRequired
};

export default ProgressPage;
