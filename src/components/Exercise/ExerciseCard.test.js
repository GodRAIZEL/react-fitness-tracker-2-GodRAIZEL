import { render, screen, fireEvent } from '@testing-library/react';
import ExerciseCard from './ExerciseCard';
import { getTodayDayKey } from '../../utils/helpers';

const mockExercise = {
  id: 1,
  name: 'Push-ups',
  category: 'strength',
  muscleGroups: ['chest', 'triceps'],
  difficulty: 'beginner',
  duration: 10,
  image: '/assets/images/pushups.jpg'
};

describe('ExerciseCard', () => {
  test('renders exercise name', () => {
    render(<ExerciseCard exercise={mockExercise} />);
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
  });

  test('displays the difficulty badge', () => {
    render(<ExerciseCard exercise={mockExercise} />);
    expect(screen.getByText('beginner')).toBeInTheDocument();
  });

  test('calls onSelect with the exercise id when the card is clicked', () => {
    const mockOnSelect = jest.fn();
    render(<ExerciseCard exercise={mockExercise} onSelect={mockOnSelect} />);

    fireEvent.click(screen.getByText('Push-ups'));
    expect(mockOnSelect).toHaveBeenCalledWith(1);
  });

  test('calls onAdd with the exercise and the default day (today) when the button is clicked', () => {
    const mockOnAdd = jest.fn();
    render(<ExerciseCard exercise={mockExercise} onAdd={mockOnAdd} />);

    fireEvent.click(screen.getByText('Add to Workout Plan'));
    expect(mockOnAdd).toHaveBeenCalledWith(mockExercise, getTodayDayKey());
  });

  test('calls onAdd with the chosen day after the day picker is changed', () => {
    const mockOnAdd = jest.fn();
    render(<ExerciseCard exercise={mockExercise} onAdd={mockOnAdd} />);

    fireEvent.change(screen.getByLabelText('Choose a day to add Push-ups to'), { target: { value: 'friday' } });
    fireEvent.click(screen.getByText('Add to Workout Plan'));

    expect(mockOnAdd).toHaveBeenCalledWith(mockExercise, 'friday');
  });

  test('the day picker defaults to today, matching capitalize(getTodayDayKey())', () => {
    render(<ExerciseCard exercise={mockExercise} />);
    const select = screen.getByLabelText('Choose a day to add Push-ups to');
    expect(select.value).toBe(getTodayDayKey());
  });

  test('offers all seven days of the week as options', () => {
    render(<ExerciseCard exercise={mockExercise} />);
    const select = screen.getByLabelText('Choose a day to add Push-ups to');
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].forEach((day) => {
      expect(screen.getByRole('option', { name: day })).toBeInTheDocument();
    });
    expect(select.children).toHaveLength(7);
  });

  test('shows the "added" label when isInPlan is true', () => {
    render(<ExerciseCard exercise={mockExercise} isInPlan />);
    expect(screen.getByText(/Added to plan/)).toBeInTheDocument();
  });

  test('renders the exercise image with the correct src and alt text', () => {
    render(<ExerciseCard exercise={mockExercise} />);
    const img = screen.getByAltText('Push-ups');
    expect(img).toHaveAttribute('src', '/assets/images/pushups.jpg');
  });

  test('falls back to a category placeholder image when the image fails to load', () => {
    render(<ExerciseCard exercise={mockExercise} />);
    const img = screen.getByAltText('Push-ups');

    fireEvent.error(img);
    expect(img.src).toContain('/assets/images/placeholder-strength.svg');
  });

  test('clicking the day picker does not trigger card selection/navigation', () => {
    const mockOnSelect = jest.fn();
    render(<ExerciseCard exercise={mockExercise} onSelect={mockOnSelect} />);

    fireEvent.click(screen.getByLabelText('Choose a day to add Push-ups to'));
    expect(mockOnSelect).not.toHaveBeenCalled();
  });
});
