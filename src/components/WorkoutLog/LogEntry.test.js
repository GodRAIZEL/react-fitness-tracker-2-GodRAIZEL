import { render, screen, fireEvent } from '@testing-library/react';
import LogEntry from './LogEntry';

describe('LogEntry', () => {
  test('renders exercise name, date, sets and reps', () => {
    const entry = { id: 1, exerciseName: 'Push-ups', date: '2026-01-01', sets: 3, reps: 10, weight: 0 };
    render(<LogEntry entry={entry} onDelete={jest.fn()} />);

    expect(screen.getByText('Push-ups')).toBeInTheDocument();
    expect(screen.getByText(/2026-01-01/)).toBeInTheDocument();
  });

  test('does not show a weight suffix or total when weight is 0', () => {
    const entry = { id: 1, exerciseName: 'Push-ups', date: '2026-01-01', sets: 3, reps: 10, weight: 0 };
    render(<LogEntry entry={entry} onDelete={jest.fn()} />);

    expect(screen.queryByText(/@ 0kg/)).not.toBeInTheDocument();
    expect(screen.queryByText(/kg total/)).not.toBeInTheDocument();
  });

  test('shows the weight suffix and total weight when weight is greater than 0', () => {
    const entry = { id: 2, exerciseName: 'Deadlifts', date: '2026-01-02', sets: 5, reps: 5, weight: 60 };
    render(<LogEntry entry={entry} onDelete={jest.fn()} />);

    expect(screen.getByText(/@ 60kg/)).toBeInTheDocument();
    // 5 sets x 5 reps x 60kg = 1500kg total.
    expect(screen.getByText('1500kg total')).toBeInTheDocument();
  });

  test('calls onDelete with the entry id when the delete button is clicked', () => {
    const mockDelete = jest.fn();
    const entry = { id: 42, exerciseName: 'Squats', date: '2026-01-03', sets: 3, reps: 12, weight: 0 };
    render(<LogEntry entry={entry} onDelete={mockDelete} />);

    fireEvent.click(screen.getByLabelText('Delete log for Squats'));
    expect(mockDelete).toHaveBeenCalledWith(42);
  });
});
