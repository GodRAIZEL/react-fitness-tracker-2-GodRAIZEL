// helpers.js
// Small pure functions used for data transformation across the app.
// Kept framework-free so they are easy to unit test in isolation.

/**
 * Formats a duration given in minutes into a human readable string.
 * e.g. formatDuration(10) -> "10 min"
 */
export function formatDuration(minutes) {
  if (typeof minutes !== 'number' || Number.isNaN(minutes)) return '0 min';
  return `${minutes} min`;
}

/**
 * Calculates the total weight lifted for a single log entry (sets x reps x weight).
 */
export function calculateTotalWeight(log) {
  if (!log) return 0;
  const { sets = 0, reps = 0, weight = 0 } = log;
  return sets * reps * weight;
}

/**
 * Filters an exercise list by search term, category, muscle group and difficulty.
 * All filters are optional/'all' by default.
 */
export function filterExercises(exercises, { searchTerm = '', category = 'all', muscleGroup = 'all', difficulty = 'all' } = {}) {
  const term = searchTerm.trim().toLowerCase();
  return exercises.filter((exercise) => {
    const matchesSearch = term === '' || exercise.name.toLowerCase().includes(term);
    const matchesCategory = category === 'all' || exercise.category === category;
    const matchesMuscle = muscleGroup === 'all' || exercise.muscleGroups.includes(muscleGroup);
    const matchesDifficulty = difficulty === 'all' || exercise.difficulty === difficulty;
    return matchesSearch && matchesCategory && matchesMuscle && matchesDifficulty;
  });
}

/**
 * Sorts a list of exercises by the given field, ascending or descending.
 */
export function sortExercises(exercises, field = 'name', direction = 'asc') {
  const sorted = [...exercises].sort((a, b) => {
    if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
    if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
    return 0;
  });
  return sorted;
}

/**
 * Calculates the current consecutive-day workout streak from a history array.
 * History entries must have a `date` field in ISO format (YYYY-MM-DD).
 */
export function calculateStreak(workoutHistory) {
  if (!workoutHistory || workoutHistory.length === 0) return 0;

  const uniqueDates = [...new Set(workoutHistory.map((w) => w.date))].sort((a, b) => new Date(b) - new Date(a));

  let streak = 0;
  let cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  for (let i = 0; i < uniqueDates.length; i++) {
    const entryDate = new Date(uniqueDates[i]);
    entryDate.setHours(0, 0, 0, 0);
    const diffDays = Math.round((cursor - entryDate) / (1000 * 60 * 60 * 24));

    if (diffDays === 0 || diffDays === 1) {
      streak += 1;
      cursor = entryDate;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Sums the estimated calories burned across a workout history array.
 */
export function calculateTotalCalories(workoutHistory) {
  if (!workoutHistory) return 0;
  return workoutHistory.reduce((total, entry) => total + (entry.caloriesBurn || 0), 0);
}

/**
 * Returns today's date as an ISO date string (YYYY-MM-DD).
 */
export function getTodayISO() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Returns today's weekday as a lowercase key matching the DAYS_OF_WEEK
 * array (e.g. "monday"), used as the default selection in day pickers.
 */
export function getTodayDayKey() {
  return new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
}

/**
 * Capitalizes the first letter of a string. Used for display labels.
 */
export function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
