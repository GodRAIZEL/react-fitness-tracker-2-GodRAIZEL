import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import VideoPlayer from '../Media/VideoPlayer';
import { formatDuration, capitalize, getTodayDayKey } from '../../utils/helpers';
import { DAYS_OF_WEEK } from '../../data/exercisesData';
import styles from './Exercise.module.css';

/**
 * ExerciseDetail - full detail page for a single exercise, reached via a
 * dynamic route (/exercises/:id). Demonstrates useParams, useNavigate,
 * and programmatic navigation via the "Previous/Next" buttons.
 */
const ExerciseDetail = ({ exercises, onAddToWorkout, planExerciseIds }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(getTodayDayKey());

  const exerciseId = parseInt(id, 10);
  const exercise = exercises.find((e) => e.id === exerciseId);
  const isInPlan = planExerciseIds.includes(exerciseId);

  // Reset the day picker back to today whenever the person navigates to a
  // different exercise (via Previous/Next), so a choice made for one
  // exercise doesn't silently carry over to the next.
  useEffect(() => {
    setSelectedDay(getTodayDayKey());
  }, [exerciseId]);

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = `/assets/images/placeholder-${exercise.category}.svg`;
  };

  if (!exercise) {
    return (
      <div className={styles.notFoundInline}>
        <p>Exercise not found.</p>
        <Button onClick={() => navigate('/exercises')}>Back to Exercises</Button>
      </div>
    );
  }

  const currentIndex = exercises.findIndex((e) => e.id === exerciseId);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < exercises.length - 1;

  return (
    <div className={styles.detailWrap}>
      <Button variant="secondary" onClick={() => navigate('/exercises')}>
        &larr; Back to Exercises
      </Button>

      <img
        src={exercise.image}
        alt={exercise.name}
        className={styles.detailImage}
        onError={handleImageError}
      />

      <div className={styles.detailHeader}>
        <Badge difficulty={exercise.difficulty} />
        <h1>{exercise.name}</h1>
        <p className={styles.meta}>
          {capitalize(exercise.category)} &middot; {formatDuration(exercise.duration)} &middot; {exercise.sets} sets &times; {exercise.reps} reps
        </p>
        <div className={styles.badgeRow}>
          {exercise.muscleGroups.map((muscle, index) => (
            <Badge key={index}>{capitalize(muscle)}</Badge>
          ))}
        </div>
      </div>

      <VideoPlayer
        videoUrl={exercise.videoUrl}
        title={`${exercise.name} — Demonstration`}
        description="Follow along with proper form to get the most out of this exercise."
      />

      <h4 className={styles.sectionLabel}>Instructions</h4>
      <ol className={styles.instructionsList}>
        {exercise.instructions.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>

      <div className={styles.detailAddRow}>
        <label>
          Add to
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            aria-label={`Choose a day to add ${exercise.name} to`}
          >
            {DAYS_OF_WEEK.map((day) => (
              <option key={day} value={day}>{capitalize(day)}</option>
            ))}
          </select>
        </label>

        <Button
          variant={isInPlan ? 'secondary' : 'primary'}
          onClick={() => onAddToWorkout(exercise, selectedDay)}
        >
          {isInPlan ? 'Added to plan \u2713' : 'Add to Workout Plan'}
        </Button>
      </div>

      <div className={styles.detailNav}>
        <button
          disabled={!hasPrevious}
          onClick={() => navigate(`/exercises/${exercises[currentIndex - 1].id}`)}
        >
          &larr; Previous Exercise
        </button>
        <button
          disabled={!hasNext}
          onClick={() => navigate(`/exercises/${exercises[currentIndex + 1].id}`)}
        >
          Next Exercise &rarr;
        </button>
      </div>
    </div>
  );
};

ExerciseDetail.propTypes = {
  exercises: PropTypes.array.isRequired,
  onAddToWorkout: PropTypes.func,
  planExerciseIds: PropTypes.arrayOf(PropTypes.number)
};

ExerciseDetail.defaultProps = {
  onAddToWorkout: () => {},
  planExerciseIds: []
};

export default ExerciseDetail;
