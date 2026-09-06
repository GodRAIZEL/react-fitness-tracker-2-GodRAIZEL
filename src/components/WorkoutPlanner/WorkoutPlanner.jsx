import React from 'react';
import PropTypes from 'prop-types';
import DayCard from './DayCard';
import { DAYS_OF_WEEK } from '../../data/exercisesData';
import { capitalize } from '../../utils/helpers';
import styles from './WorkoutPlanner.module.css';

/**
 * WorkoutPlanner - main container that renders one DayCard per day of
 * the week (Monday-Sunday). Demonstrates map for lists (7 reusable
 * DayCard instances) and lifting shared workoutPlan state from App.jsx.
 */
const WorkoutPlanner = ({ workoutPlan, onRemoveExercise, onClearDay }) => {
  const totalExercises = DAYS_OF_WEEK.reduce((total, day) => total + workoutPlan[day].length, 0);

  return (
    <div>
      <p className={styles.summary}>
        <span className="mono-stat">{totalExercises}</span> exercises planned this week
      </p>

      <div className={styles.plannerGrid}>
        {DAYS_OF_WEEK.map((day) => (
          <DayCard
            key={day}
            day={day}
            dayLabel={capitalize(day)}
            exercises={workoutPlan[day]}
            onRemoveExercise={(exerciseId) => onRemoveExercise(day, exerciseId)}
            onClearDay={() => onClearDay(day)}
          />
        ))}
      </div>
    </div>
  );
};

WorkoutPlanner.propTypes = {
  workoutPlan: PropTypes.object.isRequired,
  onRemoveExercise: PropTypes.func.isRequired,
  onClearDay: PropTypes.func.isRequired
};

export default WorkoutPlanner;
