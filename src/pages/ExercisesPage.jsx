import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from '../components/UI/SearchBar';
import ExerciseFilter from '../components/Exercise/ExerciseFilter';
import ExerciseList from '../components/Exercise/ExerciseList';
import { exercisesData } from '../data/exercisesData';
import { filterExercises, sortExercises } from '../utils/helpers';
import styles from './Pages.module.css';

/**
 * ExercisesPage - the main "Browse Exercises" route. Owns local search/
 * filter/sort state, simulates an async data load with useEffect + a
 * loading state, and delegates rendering to ExerciseFilter + ExerciseList.
 */
const ExercisesPage = ({ planExerciseIds, onAddToWorkout }) => {
  const navigate = useNavigate();

  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [muscleGroup, setMuscleGroup] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Simulate an async data fetch on mount so the loading state is exercised.
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      try {
        setExercises(exercisesData);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load exercises.');
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const filtered = filterExercises(exercises, { searchTerm, category, muscleGroup, difficulty });
  const sorted = sortExercises(filtered, sortBy, 'asc');

  const handleClearFilters = () => {
    setCategory('all');
    setMuscleGroup('all');
    setDifficulty('all');
    setSearchTerm('');
  };

  return (
    <div>
      <h1>Browse Exercises</h1>
      <p className={styles.pageIntro}>
        {isLoading ? 'Loading the exercise library...' : `${sorted.length} exercises found`}
      </p>

      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} onClear={() => setSearchTerm('')} />

      <ExerciseFilter
        category={category}
        muscleGroup={muscleGroup}
        difficulty={difficulty}
        onCategoryChange={setCategory}
        onMuscleGroupChange={setMuscleGroup}
        onDifficultyChange={setDifficulty}
        onClearFilters={handleClearFilters}
      />

      <label className={styles.sortLabel}>
        Sort by:
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Name</option>
          <option value="duration">Duration</option>
          <option value="caloriesBurn">Calories Burned</option>
        </select>
      </label>

      <div className="lane-divider" />

      <ExerciseList
        exercises={sorted}
        isLoading={isLoading}
        error={error}
        planExerciseIds={planExerciseIds}
        onSelectExercise={(id) => navigate(`/exercises/${id}`)}
        onAddToWorkout={onAddToWorkout}
      />
    </div>
  );
};

ExercisesPage.propTypes = {
  planExerciseIds: PropTypes.arrayOf(PropTypes.number),
  onAddToWorkout: PropTypes.func
};

ExercisesPage.defaultProps = {
  planExerciseIds: [],
  onAddToWorkout: () => {}
};

export default ExercisesPage;
