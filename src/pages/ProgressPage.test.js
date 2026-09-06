import { render, screen } from '@testing-library/react';
import ProgressPage from './ProgressPage';
import { DAYS_OF_WEEK } from '../data/exercisesData';

const emptyPlan = DAYS_OF_WEEK.reduce((acc, day) => ({ ...acc, [day]: [] }), {});

describe('ProgressPage', () => {
  test('shows the empty state when there is no workout history', () => {
    render(<ProgressPage workoutHistory={[]} workoutPlan={emptyPlan} />);
    expect(screen.getByText(/Log a workout to start seeing your progress chart/)).toBeInTheDocument();
  });

  test('shows the progress chart when workout history exists', () => {
    const history = [{ id: 1, date: new Date().toISOString().split('T')[0], caloriesBurn: 50 }];
    render(<ProgressPage workoutHistory={history} workoutPlan={emptyPlan} />);
    expect(screen.queryByText(/Log a workout to start seeing/)).not.toBeInTheDocument();
  });

  test('displays the total planned exercise count from workoutPlan', () => {
    const plan = { ...emptyPlan, monday: [{ id: 1, name: 'Push-ups' }], wednesday: [{ id: 2, name: 'Squats' }] };
    render(<ProgressPage workoutHistory={[]} workoutPlan={plan} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('displays total calories burned across history entries', () => {
    const history = [
      { id: 1, date: '2026-01-01', caloriesBurn: 50 },
      { id: 2, date: '2026-01-02', caloriesBurn: 70 }
    ];
    render(<ProgressPage workoutHistory={history} workoutPlan={emptyPlan} />);
    expect(screen.getByText('120')).toBeInTheDocument();
  });
});
