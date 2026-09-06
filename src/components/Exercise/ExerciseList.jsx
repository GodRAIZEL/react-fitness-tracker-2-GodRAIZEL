import React from 'react';
import PropTypes from 'prop-types';
import ExerciseCard from './ExerciseCard';
import Loading from '../common/Loading';
import EmptyState from '../common/EmptyState';
import styles from './Exercise.module.css';

/**
 * ExerciseList - renders an array of ExerciseCard components (map for lists),
 * and conditionally renders a loading spinner, an error message, or an
 * empty-state message depending on the current data state.
 */
const ExerciseList = ({ exercises, isLoading, error, planExerciseIds, onSelectExercise, onAddToWorkout }) => {
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <>
      {exercises.length === 0 ? (
        <EmptyState message="No exercises match your filters. Try broadening your search." />
      ) : (
        <div className={styles.grid}>
          {exercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              isInPlan={planExerciseIds.includes(exercise.id)}
              onSelect={onSelectExercise}
              onAdd={onAddToWorkout}
            />
          ))}
        </div>
      )}
    </>
  );
};

ExerciseList.propTypes = {
  exercises: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  planExerciseIds: PropTypes.arrayOf(PropTypes.number),
  onSelectExercise: PropTypes.func,
  onAddToWorkout: PropTypes.func
};

ExerciseList.defaultProps = {
  isLoading: false,
  error: null,
  planExerciseIds: [],
  onSelectExercise: () => {},
  onAddToWorkout: () => {}
};

export default ExerciseList;
