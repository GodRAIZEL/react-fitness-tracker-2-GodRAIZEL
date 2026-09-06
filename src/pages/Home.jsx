import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AudioPlayer from '../components/Media/AudioPlayer';
import { motivationTracks } from '../data/exercisesData';
import { calculateStreak, calculateTotalCalories } from '../utils/helpers';
import styles from './Pages.module.css';

/**
 * Home - landing page. Shows a hero section, a scoreboard-style stats
 * strip calculated from workout history, and motivational audio tracks.
 */
const Home = ({ workoutHistory, totalPlannedExercises }) => {
  const streak = calculateStreak(workoutHistory);
  const totalCalories = calculateTotalCalories(workoutHistory);

  return (
    <div>
      <section className={styles.hero}>
        <h4 className={styles.eyebrow}>Fitness Tracker &amp; Workout Planner</h4>
        <h1>Train with a plan.<br />Track every rep.</h1>
        <p className={styles.heroCopy}>
          Browse exercises, build your week, log every set, and watch your progress
          add up — one honest workout at a time.
        </p>
        <div className={styles.heroActions}>
          <Link to="/exercises" className={styles.heroBtnPrimary}>Browse Exercises</Link>
          <Link to="/workout-planner" className={styles.heroBtnSecondary}>Plan This Week</Link>
        </div>
      </section>

      <div className="lane-divider" />

      <section className={styles.scoreboard}>
        <div className={styles.scoreCell}>
          <span className={`mono-stat ${styles.scoreNumber}`}>{streak}</span>
          <span className={styles.scoreLabel}>Day Streak</span>
        </div>
        <div className={styles.scoreCell}>
          <span className={`mono-stat ${styles.scoreNumber}`}>{workoutHistory.length}</span>
          <span className={styles.scoreLabel}>Workouts Logged</span>
        </div>
        <div className={styles.scoreCell}>
          <span className={`mono-stat ${styles.scoreNumber}`}>{totalPlannedExercises}</span>
          <span className={styles.scoreLabel}>Planned This Week</span>
        </div>
        <div className={styles.scoreCell}>
          <span className={`mono-stat ${styles.scoreNumber}`}>{totalCalories}</span>
          <span className={styles.scoreLabel}>Calories Burned</span>
        </div>
      </section>

      <section className={styles.motivationSection}>
        <h4 className={styles.sectionTitle}>Motivation Tracks</h4>
        <div className={styles.audioGrid}>
          {motivationTracks.map((track) => (
            <AudioPlayer
              key={track.id}
              audioUrl={track.audioUrl}
              title={track.title}
              description={track.description}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

Home.propTypes = {
  workoutHistory: PropTypes.array,
  totalPlannedExercises: PropTypes.number
};

Home.defaultProps = {
  workoutHistory: [],
  totalPlannedExercises: 0
};

export default Home;
