import { render, screen } from '@testing-library/react';
import ExerciseList from './ExerciseList';

const exercises = [
  { id: 1, name: 'Push-ups', category: 'strength', muscleGroups: ['chest'], difficulty: 'beginner', duration: 10 },
  { id: 2, name: 'Squats', category: 'strength', muscleGroups: ['legs'], difficulty: 'beginner', duration: 10 }
];

describe('ExerciseList', () => {
  test('shows the loading state while data is loading', () => {
    render(<ExerciseList exercises={[]} isLoading />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('shows an empty state when there are no exercises', () => {
    render(<ExerciseList exercises={[]} isLoading={false} />);
    expect(screen.getByText(/No exercises match/i)).toBeInTheDocument();
  });

  test('shows an error message when error is set', () => {
    render(<ExerciseList exercises={[]} error="Failed to load exercises" />);
    expect(screen.getByText('Failed to load exercises')).toBeInTheDocument();
  });

  test('renders a card for every exercise passed in', () => {
    render(<ExerciseList exercises={exercises} />);
    expect(screen.getByText('Push-ups')).toBeInTheDocument();
    expect(screen.getByText('Squats')).toBeInTheDocument();
  });
});
