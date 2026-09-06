import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ExerciseDetail from './ExerciseDetail';
import { getTodayDayKey } from '../../utils/helpers';

const exercises = [
  {
    id: 1,
    name: 'Push-ups',
    category: 'strength',
    muscleGroups: ['chest'],
    difficulty: 'beginner',
    duration: 10,
    sets: 3,
    reps: 15,
    image: '/assets/images/pushups.jpg',
    videoUrl: 'https://example.com/video.mp4',
    instructions: ['Step one', 'Step two']
  },
  {
    id: 2,
    name: 'Squats',
    category: 'strength',
    muscleGroups: ['legs'],
    difficulty: 'beginner',
    duration: 10,
    sets: 3,
    reps: 20,
    image: '/assets/images/squats.jpg',
    videoUrl: 'https://example.com/video.mp4',
    instructions: ['Step one']
  },
  {
    id: 3,
    name: 'Deadlifts',
    category: 'strength',
    muscleGroups: ['back'],
    difficulty: 'advanced',
    duration: 20,
    sets: 5,
    reps: 5,
    image: '/assets/images/deadlifts.jpg',
    videoUrl: 'https://example.com/video.mp4',
    instructions: ['Step one']
  }
];

const renderDetail = (route, props = {}) =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/exercises" element={<div>Exercises List Page</div>} />
        <Route path="/exercises/:id" element={<ExerciseDetail exercises={exercises} {...props} />} />
      </Routes>
    </MemoryRouter>
  );

describe('ExerciseDetail', () => {
  test('renders the exercise name and instructions for a valid id', () => {
    renderDetail('/exercises/1');
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
    expect(screen.getByText('Step one')).toBeInTheDocument();
  });

  test('shows a not-found message for an invalid id', () => {
    renderDetail('/exercises/999');
    expect(screen.getByText('Exercise not found.')).toBeInTheDocument();
  });

  test('navigates back to the exercises list from the not-found state', () => {
    renderDetail('/exercises/999');
    fireEvent.click(screen.getByText('Back to Exercises'));
    expect(screen.getByText('Exercises List Page')).toBeInTheDocument();
  });

  test('disables the Previous button on the first exercise and enables Next', () => {
    renderDetail('/exercises/1');
    expect(screen.getByText(/Previous Exercise/)).toBeDisabled();
    expect(screen.getByText(/Next Exercise/)).not.toBeDisabled();
  });

  test('disables the Next button on the last exercise and enables Previous', () => {
    renderDetail('/exercises/3');
    expect(screen.getByText(/Next Exercise/)).toBeDisabled();
    expect(screen.getByText(/Previous Exercise/)).not.toBeDisabled();
  });

  test('navigates to the next exercise when Next is clicked', () => {
    renderDetail('/exercises/1');
    fireEvent.click(screen.getByText(/Next Exercise/));
    expect(screen.getByText('Squats')).toBeInTheDocument();
  });

  test('navigates to the previous exercise when Previous is clicked', () => {
    renderDetail('/exercises/2');
    fireEvent.click(screen.getByText(/Previous Exercise/));
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
  });

  test('shows the "added" label when the exercise is already in the plan', () => {
    renderDetail('/exercises/1', { planExerciseIds: [1] });
    expect(screen.getByText(/Added to plan/)).toBeInTheDocument();
  });

  test('calls onAddToWorkout with the exercise and the default day (today) when clicked', () => {
    const mockOnAdd = jest.fn();
    renderDetail('/exercises/1', { onAddToWorkout: mockOnAdd });

    fireEvent.click(screen.getByText('Add to Workout Plan'));
    expect(mockOnAdd).toHaveBeenCalledWith(exercises[0], getTodayDayKey());
  });

  test('calls onAddToWorkout with the day chosen from the picker', () => {
    const mockOnAdd = jest.fn();
    renderDetail('/exercises/1', { onAddToWorkout: mockOnAdd });

    fireEvent.change(screen.getByLabelText('Choose a day to add Push-ups to'), { target: { value: 'sunday' } });
    fireEvent.click(screen.getByText('Add to Workout Plan'));

    expect(mockOnAdd).toHaveBeenCalledWith(exercises[0], 'sunday');
  });

  test('resets the day picker back to today when navigating to a different exercise', () => {
    renderDetail('/exercises/1');

    fireEvent.change(screen.getByLabelText('Choose a day to add Push-ups to'), { target: { value: 'sunday' } });
    expect(screen.getByLabelText('Choose a day to add Push-ups to').value).toBe('sunday');

    fireEvent.click(screen.getByText(/Next Exercise/));

    expect(screen.getByLabelText('Choose a day to add Squats to').value).toBe(getTodayDayKey());
  });

  test('renders the exercise image and falls back to a placeholder on error', () => {
    renderDetail('/exercises/1');
    const img = screen.getByAltText('Push-ups');
    expect(img).toHaveAttribute('src', '/assets/images/pushups.jpg');

    fireEvent.error(img);
    expect(img.src).toContain('/assets/images/placeholder-strength.svg');
  });
});
