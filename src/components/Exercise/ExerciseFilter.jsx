import React from 'react';
import PropTypes from 'prop-types';
import { CATEGORIES, MUSCLE_GROUPS, DIFFICULTIES } from '../../data/exercisesData';
import { capitalize } from '../../utils/helpers';
import styles from './Exercise.module.css';

/**
 * ExerciseFilter - three dropdowns for narrowing the exercise list by
 * category, muscle group and difficulty, plus a clear-filters button.
 */
const ExerciseFilter = ({ category, muscleGroup, difficulty, onCategoryChange, onMuscleGroupChange, onDifficultyChange, onClearFilters }) => {
  const filtersActive = category !== 'all' || muscleGroup !== 'all' || difficulty !== 'all';

  return (
    <div className={styles.filterBar}>
      <select value={category} onChange={(e) => onCategoryChange(e.target.value)}>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c === 'all' ? 'All Categories' : capitalize(c)}</option>
        ))}
      </select>

      <select value={muscleGroup} onChange={(e) => onMuscleGroupChange(e.target.value)}>
        {MUSCLE_GROUPS.map((m) => (
          <option key={m} value={m}>{m === 'all' ? 'All Muscle Groups' : capitalize(m)}</option>
        ))}
      </select>

      <select value={difficulty} onChange={(e) => onDifficultyChange(e.target.value)}>
        {DIFFICULTIES.map((d) => (
          <option key={d} value={d}>{d === 'all' ? 'All Difficulties' : capitalize(d)}</option>
        ))}
      </select>

      {filtersActive && (
        <button className={styles.clearFiltersBtn} onClick={onClearFilters}>
          Clear Filters
        </button>
      )}
    </div>
  );
};

ExerciseFilter.propTypes = {
  category: PropTypes.string.isRequired,
  muscleGroup: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onMuscleGroupChange: PropTypes.func.isRequired,
  onDifficultyChange: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired
};

export default ExerciseFilter;
