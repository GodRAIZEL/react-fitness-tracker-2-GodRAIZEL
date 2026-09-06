import {
  formatDuration,
  calculateTotalWeight,
  filterExercises,
  sortExercises,
  calculateStreak,
  calculateTotalCalories,
  getTodayDayKey,
  capitalize
} from './helpers';

const sampleExercises = [
  { id: 1, name: 'Push-ups', category: 'strength', muscleGroups: ['chest'], difficulty: 'beginner' },
  { id: 2, name: 'Running', category: 'cardio', muscleGroups: ['legs'], difficulty: 'beginner' },
  { id: 3, name: 'Deadlifts', category: 'strength', muscleGroups: ['back', 'legs'], difficulty: 'advanced' }
];

describe('formatDuration', () => {
  test('formats a numeric duration in minutes', () => {
    expect(formatDuration(10)).toBe('10 min');
  });

  test('returns a fallback for invalid input', () => {
    expect(formatDuration('not a number')).toBe('0 min');
  });
});

describe('calculateTotalWeight', () => {
  test('multiplies sets, reps and weight together', () => {
    expect(calculateTotalWeight({ sets: 3, reps: 10, weight: 20 })).toBe(600);
  });

  test('returns 0 for a missing log', () => {
    expect(calculateTotalWeight(null)).toBe(0);
  });
});

describe('filterExercises', () => {
  test('filters by search term', () => {
    const result = filterExercises(sampleExercises, { searchTerm: 'push' });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Push-ups');
  });

  test('filters by category', () => {
    const result = filterExercises(sampleExercises, { category: 'strength' });
    expect(result).toHaveLength(2);
  });

  test('filters by muscle group', () => {
    const result = filterExercises(sampleExercises, { muscleGroup: 'legs' });
    expect(result).toHaveLength(2);
  });

  test('filters by difficulty', () => {
    const result = filterExercises(sampleExercises, { difficulty: 'advanced' });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Deadlifts');
  });
});

describe('sortExercises', () => {
  test('sorts ascending by name', () => {
    const result = sortExercises(sampleExercises, 'name', 'asc');
    expect(result[0].name).toBe('Deadlifts');
  });

  test('sorts descending by name', () => {
    const result = sortExercises(sampleExercises, 'name', 'desc');
    expect(result[0].name).toBe('Running');
  });
});

describe('calculateStreak', () => {
  test('returns 0 for empty history', () => {
    expect(calculateStreak([])).toBe(0);
  });

  test('counts a single day as a streak of 1', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(calculateStreak([{ date: today }])).toBe(1);
  });
});

describe('calculateTotalCalories', () => {
  test('sums calories burned across entries', () => {
    const history = [{ caloriesBurn: 100 }, { caloriesBurn: 50 }];
    expect(calculateTotalCalories(history)).toBe(150);
  });

  test('returns 0 for undefined history', () => {
    expect(calculateTotalCalories(undefined)).toBe(0);
  });
});

describe('getTodayDayKey', () => {
  test('returns a lowercase weekday matching the real current date', () => {
    const expected = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    expect(getTodayDayKey()).toBe(expected);
  });

  test('returns one of the seven valid weekday keys', () => {
    const validDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    expect(validDays).toContain(getTodayDayKey());
  });
});

describe('capitalize', () => {
  test('capitalizes the first letter', () => {
    expect(capitalize('strength')).toBe('Strength');
  });

  test('returns empty string for falsy input', () => {
    expect(capitalize('')).toBe('');
  });
});
