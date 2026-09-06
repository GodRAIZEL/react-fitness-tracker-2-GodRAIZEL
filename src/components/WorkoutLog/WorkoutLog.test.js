import { render, screen, fireEvent } from '@testing-library/react';
import WorkoutLog from './WorkoutLog';

const exercises = [
  { id: 1, name: 'Push-ups', caloriesBurn: 50 },
  { id: 2, name: 'Squats', caloriesBurn: 60 }
];

describe('WorkoutLog', () => {
  test('shows an empty state when there is no history', () => {
    render(<WorkoutLog exercises={exercises} history={[]} onLogWorkout={jest.fn()} />);
    expect(screen.getByText(/No workouts logged yet/)).toBeInTheDocument();
  });

  test('renders existing history entries', () => {
    const history = [{ id: 1, exerciseName: 'Push-ups', date: '2026-01-01', sets: 3, reps: 10, weight: 0 }];
    render(<WorkoutLog exercises={exercises} history={history} onLogWorkout={jest.fn()} />);
    // "Push-ups" also appears as an <option> in the exercise <select>,
    // so scope the query to the log entry's <strong> element.
    expect(screen.getByText('Push-ups', { selector: 'strong' })).toBeInTheDocument();
  });

  test('calls onLogWorkout with form data on submit', () => {
    const mockLog = jest.fn();
    render(<WorkoutLog exercises={exercises} history={[]} onLogWorkout={mockLog} />);

    fireEvent.click(screen.getByText('Log Workout'));
    expect(mockLog).toHaveBeenCalledTimes(1);
    expect(mockLog.mock.calls[0][0]).toMatchObject({ exerciseName: 'Push-ups' });
  });

  test('submits updated values after changing exercise, sets, reps, weight and date', () => {
    const mockLog = jest.fn();
    render(<WorkoutLog exercises={exercises} history={[]} onLogWorkout={mockLog} />);

    fireEvent.change(screen.getByLabelText('Exercise'), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText('Sets'), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText('Reps'), { target: { value: '12' } });
    fireEvent.change(screen.getByLabelText('Weight (kg)'), { target: { value: '40' } });
    fireEvent.change(screen.getByLabelText('Date'), { target: { value: '2026-02-14' } });

    fireEvent.click(screen.getByText('Log Workout'));

    expect(mockLog).toHaveBeenCalledWith(
      expect.objectContaining({
        exerciseName: 'Squats',
        sets: 5,
        reps: 12,
        weight: 40,
        date: '2026-02-14'
      })
    );
  });

  test('does not call onLogWorkout when no exercise is available to select', () => {
    const mockLog = jest.fn();
    render(<WorkoutLog exercises={[]} history={[]} onLogWorkout={mockLog} />);

    fireEvent.click(screen.getByText('Log Workout'));
    expect(mockLog).not.toHaveBeenCalled();
  });

  test('calls onDeleteEntry when a history entry is deleted', () => {
    const mockDelete = jest.fn();
    const history = [{ id: 7, exerciseName: 'Push-ups', date: '2026-01-01', sets: 3, reps: 10, weight: 0 }];
    render(<WorkoutLog exercises={exercises} history={history} onLogWorkout={jest.fn()} onDeleteEntry={mockDelete} />);

    fireEvent.click(screen.getByLabelText('Delete log for Push-ups'));
    expect(mockDelete).toHaveBeenCalledWith(7);
  });
});
