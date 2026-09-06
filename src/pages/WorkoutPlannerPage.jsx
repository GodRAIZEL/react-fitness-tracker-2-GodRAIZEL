import React from 'react';
import PropTypes from 'prop-types';
import WorkoutPlanner from '../components/WorkoutPlanner/WorkoutPlanner';
import styles from './Pages.module.css';

/**
 * WorkoutPlannerPage - thin page wrapper around the WorkoutPlanner
 * component, receiving the shared workoutPlan state lifted up in App.jsx.
 */
const WorkoutPlannerPage = ({ workoutPlan, onRemoveExercise, onClearDay }) => {
  return (
    <div>
      <h1>Workout Planner</h1>
      <p className={styles.pageIntro}>
        Build your week. Add exercises from the library, then track them here day by day.
      </p>
      <div className="lane-divider" />
      <WorkoutPlanner
        workoutPlan={workoutPlan}
        onRemoveExercise={onRemoveExercise}
        onClearDay={onClearDay}
      />
    </div>
  );
};

WorkoutPlannerPage.propTypes = {
  workoutPlan: PropTypes.object.isRequired,
  onRemoveExercise: PropTypes.func.isRequired,
  onClearDay: PropTypes.func.isRequired
};

export default WorkoutPlannerPage;
