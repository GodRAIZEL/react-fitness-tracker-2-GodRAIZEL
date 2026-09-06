import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '../UI/Card';
import Badge from '../UI/Badge';
import Button from '../UI/Button';
import { formatDuration, capitalize, getTodayDayKey } from '../../utils/helpers';
import { DAYS_OF_WEEK } from '../../data/exercisesData';
import styles from './Exercise.module.css';

/**
 * ExerciseCard - displays a single exercise's summary information.
 * Receives exercise data and callbacks as props from ExerciseList (parent),
 * and reports selection/add-to-plan events back up via callback props.
 *
 * Holds its own local `selectedDay` state so the person can choose which
 * day of the week (Monday-Sunday) to add this exercise to, defaulting to
 * today for convenience.
 */
const ExerciseCard = ({ exercise, isInPlan, onSelect, onAdd }) => {
  const { id, name, category, difficulty, duration, muscleGroups, image } = exercise;
  const [selectedDay, setSelectedDay] = useState(getTodayDayKey());

  // Falls back to a category-specific local placeholder if the exercise's
  // own image is missing or fails to load, so the layout never shows a
  // broken image icon.
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = `/assets/images/placeholder-${category}.svg`;
  };

  return (
    <Card onClick={() => onSelect(id)} isSelected={isInPlan}>
      <div className={styles.cardInner}>
        <img
          src={image}
          alt={name}
          className={styles.cardImage}
          onError={handleImageError}
        />

        <div className={styles.cardTop}>
          <Badge difficulty={difficulty} />
          <span className={styles.category}>{capitalize(category)}</span>
        </div>

        <h3>{name}</h3>
        <p className={styles.meta}>{formatDuration(duration)} &middot; {muscleGroups.slice(0, 2).map(capitalize).join(', ')}</p>

        <div className={styles.badgeRow}>
          {muscleGroups.slice(0, 3).map((muscle, index) => (
            <Badge key={index}>{capitalize(muscle)}</Badge>
          ))}
        </div>

        {/* Day picker + add button - stops click propagation so
            interacting with either never triggers the Card's onClick
            (which navigates to the exercise detail page). */}
        <div className={styles.addRow} onClick={(e) => e.stopPropagation()}>
          <label className={styles.dayPickerLabel}>
            Add to
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              aria-label={`Choose a day to add ${name} to`}
            >
              {DAYS_OF_WEEK.map((day) => (
                <option key={day} value={day}>{capitalize(day)}</option>
              ))}
            </select>
          </label>

          <Button
            variant={isInPlan ? 'secondary' : 'primary'}
            onClick={(e) => {
              e.stopPropagation();
              onAdd(exercise, selectedDay);
            }}
            fullWidth
          >
            {isInPlan ? 'Added to plan \u2713' : 'Add to Workout Plan'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

ExerciseCard.propTypes = {
  exercise: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    muscleGroups: PropTypes.arrayOf(PropTypes.string),
    difficulty: PropTypes.string,
    duration: PropTypes.number,
    image: PropTypes.string
  }).isRequired,
  isInPlan: PropTypes.bool,
  onSelect: PropTypes.func,
  onAdd: PropTypes.func
};

ExerciseCard.defaultProps = {
  isInPlan: false,
  onSelect: () => {},
  onAdd: () => {}
};

export default ExerciseCard;
