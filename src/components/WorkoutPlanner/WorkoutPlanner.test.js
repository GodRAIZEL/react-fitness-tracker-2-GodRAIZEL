import { render, screen, within, fireEvent } from '@testing-library/react';
import WorkoutPlanner from './WorkoutPlanner';
import { DAYS_OF_WEEK } from '../../data/exercisesData';

const emptyPlan = DAYS_OF_WEEK.reduce((acc, day) => ({ ...acc, [day]: [] }), {});

describe('WorkoutPlanner', () => {
  test('renders a day card for every day of the week', () => {
    render(<WorkoutPlanner workoutPlan={emptyPlan} onRemoveExercise={jest.fn()} onClearDay={jest.fn()} />);
    expect(screen.getByText('Monday')).toBeInTheDocument();
    expect(screen.getByText('Sunday')).toBeInTheDocument();
  });

  test('shows the total number of planned exercises', () => {
    const plan = { ...emptyPlan, monday: [{ id: 1, name: 'Push-ups' }] };
    render(<WorkoutPlanner workoutPlan={plan} onRemoveExercise={jest.fn()} onClearDay={jest.fn()} />);
    // "1" also appears in Monday's per-day count badge, so scope the
    // query to the weekly summary paragraph specifically.
    const summary = screen.getByText(/exercises planned this week/);
    expect(within(summary).getByText('1')).toBeInTheDocument();
  });

  test('calls onRemoveExercise with the day and exercise id when a DayCard removes an exercise', () => {
    const mockRemove = jest.fn();
    const plan = { ...emptyPlan, monday: [{ id: 1, name: 'Push-ups' }] };
    render(<WorkoutPlanner workoutPlan={plan} onRemoveExercise={mockRemove} onClearDay={jest.fn()} />);

    fireEvent.click(screen.getByLabelText('Remove Push-ups'));
    expect(mockRemove).toHaveBeenCalledWith('monday', 1);
  });

  test('calls onClearDay with the correct day when a DayCard is cleared', () => {
    const mockClear = jest.fn();
    const plan = { ...emptyPlan, tuesday: [{ id: 2, name: 'Squats' }] };
    render(<WorkoutPlanner workoutPlan={plan} onRemoveExercise={jest.fn()} onClearDay={mockClear} />);

    fireEvent.click(screen.getByText('Clear Day'));
    expect(mockClear).toHaveBeenCalledWith('tuesday');
  });
});
