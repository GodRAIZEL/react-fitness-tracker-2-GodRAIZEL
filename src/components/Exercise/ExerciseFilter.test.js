import { render, screen, fireEvent } from '@testing-library/react';
import ExerciseFilter from './ExerciseFilter';

const noop = jest.fn();

describe('ExerciseFilter', () => {
  test('does not show the Clear Filters button when all filters are "all"', () => {
    render(
      <ExerciseFilter
        category="all"
        muscleGroup="all"
        difficulty="all"
        onCategoryChange={noop}
        onMuscleGroupChange={noop}
        onDifficultyChange={noop}
        onClearFilters={noop}
      />
    );
    expect(screen.queryByText('Clear Filters')).not.toBeInTheDocument();
  });

  test('shows the Clear Filters button when a filter is active', () => {
    render(
      <ExerciseFilter
        category="strength"
        muscleGroup="all"
        difficulty="all"
        onCategoryChange={noop}
        onMuscleGroupChange={noop}
        onDifficultyChange={noop}
        onClearFilters={noop}
      />
    );
    expect(screen.getByText('Clear Filters')).toBeInTheDocument();
  });

  test('calls onCategoryChange when the category dropdown changes', () => {
    const mockChange = jest.fn();
    render(
      <ExerciseFilter
        category="all"
        muscleGroup="all"
        difficulty="all"
        onCategoryChange={mockChange}
        onMuscleGroupChange={noop}
        onDifficultyChange={noop}
        onClearFilters={noop}
      />
    );

    fireEvent.change(screen.getByDisplayValue('All Categories'), { target: { value: 'cardio' } });
    expect(mockChange).toHaveBeenCalledWith('cardio');
  });

  test('calls onMuscleGroupChange when the muscle group dropdown changes', () => {
    const mockChange = jest.fn();
    render(
      <ExerciseFilter
        category="all"
        muscleGroup="all"
        difficulty="all"
        onCategoryChange={noop}
        onMuscleGroupChange={mockChange}
        onDifficultyChange={noop}
        onClearFilters={noop}
      />
    );

    fireEvent.change(screen.getByDisplayValue('All Muscle Groups'), { target: { value: 'legs' } });
    expect(mockChange).toHaveBeenCalledWith('legs');
  });

  test('calls onDifficultyChange when the difficulty dropdown changes', () => {
    const mockChange = jest.fn();
    render(
      <ExerciseFilter
        category="all"
        muscleGroup="all"
        difficulty="all"
        onCategoryChange={noop}
        onMuscleGroupChange={noop}
        onDifficultyChange={mockChange}
        onClearFilters={noop}
      />
    );

    fireEvent.change(screen.getByDisplayValue('All Difficulties'), { target: { value: 'advanced' } });
    expect(mockChange).toHaveBeenCalledWith('advanced');
  });

  test('calls onClearFilters when the clear button is clicked', () => {
    const mockClear = jest.fn();
    render(
      <ExerciseFilter
        category="strength"
        muscleGroup="all"
        difficulty="all"
        onCategoryChange={noop}
        onMuscleGroupChange={noop}
        onDifficultyChange={noop}
        onClearFilters={mockClear}
      />
    );

    fireEvent.click(screen.getByText('Clear Filters'));
    expect(mockClear).toHaveBeenCalledTimes(1);
  });
});
