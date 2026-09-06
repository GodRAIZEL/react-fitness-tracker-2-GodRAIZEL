import React from 'react';
import PropTypes from 'prop-types';
import { DAYS_OF_WEEK } from '../../data/exercisesData';
import { capitalize } from '../../utils/helpers';
import styles from './WorkoutLog.module.css';

/**
 * ProgressChart - a lightweight bar chart (built with plain divs, no
 * external charting library) showing workouts logged per weekday.
 */
const ProgressChart = ({ history }) => {
  const countsByDay = DAYS_OF_WEEK.map((day) => {
    const count = history.filter((entry) => {
      const entryDay = new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
      return entryDay === day;
    }).length;
    return { day, count };
  });

  const maxCount = Math.max(1, ...countsByDay.map((d) => d.count));

  return (
    <div className={styles.chartWrap}>
      {countsByDay.map(({ day, count }) => (
        <div key={day} className={styles.chartCol}>
          <div
            className={styles.chartBar}
            style={{ height: `${(count / maxCount) * 100}%`, backgroundColor: count > 0 ? 'var(--ember)' : 'var(--chalk-dim)' }}
          />
          <span className={styles.chartValue}>{count}</span>
          <span className={styles.chartLabel}>{capitalize(day).slice(0, 3)}</span>
        </div>
      ))}
    </div>
  );
};

ProgressChart.propTypes = {
  history: PropTypes.array.isRequired
};

export default ProgressChart;
