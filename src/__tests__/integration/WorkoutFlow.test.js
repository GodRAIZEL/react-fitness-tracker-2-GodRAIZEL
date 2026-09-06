import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import App from '../../App';
import { getTodayDayKey, capitalize } from '../../utils/helpers';

// This suite exercises the full user flow across multiple real
// components at once (Navbar, ExercisesPage, ExerciseList, ExerciseCard,
// WorkoutPlannerPage, WorkoutPlanner, DayCard) wired together through App,
// rather than mocking any of them individually.
beforeAll(() => {
  window.HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue();
  window.HTMLMediaElement.prototype.pause = jest.fn();
});

beforeEach(() => {
  window.localStorage.clear();
});

describe('Workout Flow Integration', () => {
  test('user can browse to exercises, add one to the plan, and see it in the planner', async () => {
    render(<App />);

    // Navigate to the exercises page.
    fireEvent.click(screen.getByText('Exercises'));
    expect(screen.getByText('Browse Exercises')).toBeInTheDocument();

    // Wait for the simulated async load to finish.
    await waitFor(() => {
      expect(screen.getByText('Push-ups')).toBeInTheDocument();
    });

    // Add Push-ups specifically to today's workout plan (list order can
    // vary once sorted, so locate the Push-ups card and act within it).
    const pushUpsHeading = screen.getByText('Push-ups');
    const pushUpsCard = pushUpsHeading.closest('div');
    fireEvent.click(within(pushUpsCard).getByText('Add to Workout Plan'));

    // Navigate to the workout planner and confirm it shows up on today's day.
    fireEvent.click(screen.getByText('Planner'));
    expect(screen.getByText('Workout Planner')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByText('Push-ups').length).toBeGreaterThan(0);
    });
  });

  test('user can search the exercise library and see filtered results', async () => {
    render(<App />);

    fireEvent.click(screen.getByText('Exercises'));
    await waitFor(() => {
      expect(screen.getByText('Push-ups')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search exercises...');
    fireEvent.change(searchInput, { target: { value: 'burpee' } });

    await waitFor(() => {
      expect(screen.getByText('Burpees')).toBeInTheDocument();
      expect(screen.queryByText('Push-ups')).not.toBeInTheDocument();
    });
  });

  test('user can log a workout and see it reflected on the history page', async () => {
    render(<App />);

    fireEvent.click(screen.getByText('History'));
    expect(screen.getByText('Workout History')).toBeInTheDocument();
    expect(screen.getByText(/No workouts logged yet/)).toBeInTheDocument();

    fireEvent.click(screen.getByText('Log Workout'));

    await waitFor(() => {
      expect(screen.queryByText(/No workouts logged yet/)).not.toBeInTheDocument();
    });
  });

  test('choosing a different day in the picker plans the exercise there instead of today', async () => {
    render(<App />);

    fireEvent.click(screen.getByText('Exercises'));
    await waitFor(() => expect(screen.getByText('Push-ups')).toBeInTheDocument());

    const pushUpsCard = screen.getByText('Push-ups').closest('div');
    const today = getTodayDayKey();
    const targetDay = today === 'monday' ? 'tuesday' : 'monday';

    fireEvent.change(
      within(pushUpsCard).getByLabelText('Choose a day to add Push-ups to'),
      { target: { value: targetDay } }
    );
    fireEvent.click(within(pushUpsCard).getByText('Add to Workout Plan'));

    fireEvent.click(screen.getByText('Planner'));

    await waitFor(() => {
      const targetDayCard = screen.getByText(capitalize(targetDay)).closest('[class*="dayCard"]');
      const todayCard = screen.getByText(capitalize(today)).closest('[class*="dayCard"]');

      expect(within(targetDayCard).getByText('Push-ups')).toBeInTheDocument();
      expect(within(todayCard).queryByText('Push-ups')).not.toBeInTheDocument();
    });
  });

  test('the same exercise can be planned on more than one day', async () => {
    render(<App />);

    fireEvent.click(screen.getByText('Exercises'));
    await waitFor(() => expect(screen.getByText('Push-ups')).toBeInTheDocument());

    const pushUpsCard = screen.getByText('Push-ups').closest('div');
    const daySelect = within(pushUpsCard).getByLabelText('Choose a day to add Push-ups to');
    const addButton = () => within(pushUpsCard).getByText(/Add to Workout Plan|Added to plan/);

    fireEvent.change(daySelect, { target: { value: 'monday' } });
    fireEvent.click(addButton());

    fireEvent.change(daySelect, { target: { value: 'friday' } });
    fireEvent.click(addButton());

    fireEvent.click(screen.getByText('Planner'));

    await waitFor(() => {
      expect(screen.getAllByText('Push-ups')).toHaveLength(2);
    });
  });

  test('logging a workout updates the streak shown on the home page', async () => {
    render(<App />);

    fireEvent.click(screen.getByText('History'));
    fireEvent.click(screen.getByText('Log Workout'));

    fireEvent.click(screen.getByText('Home'));

    await waitFor(() => {
      // Both the streak and total-workouts scoreboard cells read "1" here,
      // so assert on the count rather than a single unique text match.
      expect(screen.getAllByText('1').length).toBeGreaterThanOrEqual(2);
    });
  });
});
