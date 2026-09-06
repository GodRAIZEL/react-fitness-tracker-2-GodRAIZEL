import { render, screen, fireEvent } from '@testing-library/react';
import DayCard from './DayCard';

describe('DayCard', () => {
  test('shows an empty state when no exercises are planned', () => {
    render(<DayCard day="monday" dayLabel="Monday" exercises={[]} onRemoveExercise={jest.fn()} onClearDay={jest.fn()} />);
    expect(screen.getByText('No exercises planned yet.')).toBeInTheDocument();
  });

  test('lists planned exercises and calls onRemoveExercise when removed', () => {
    const mockRemove = jest.fn();
    const exercises = [{ id: 1, name: 'Push-ups' }];
    render(<DayCard day="monday" dayLabel="Monday" exercises={exercises} onRemoveExercise={mockRemove} onClearDay={jest.fn()} />);

    expect(screen.getByText('Push-ups')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Remove Push-ups'));
    expect(mockRemove).toHaveBeenCalledWith(1);
  });

  test('calls onClearDay when the clear button is clicked', () => {
    const mockClear = jest.fn();
    const exercises = [{ id: 1, name: 'Push-ups' }];
    render(<DayCard day="monday" dayLabel="Monday" exercises={exercises} onRemoveExercise={jest.fn()} onClearDay={mockClear} />);

    fireEvent.click(screen.getByText('Clear Day'));
    expect(mockClear).toHaveBeenCalledTimes(1);
  });
});
