import { render, screen } from '@testing-library/react';
import ProgressChart from './ProgressChart';
import { DAYS_OF_WEEK } from '../../data/exercisesData';
import { capitalize } from '../../utils/helpers';

describe('ProgressChart', () => {
  test('renders a labeled column for every day of the week', () => {
    render(<ProgressChart history={[]} />);
    DAYS_OF_WEEK.forEach((day) => {
      expect(screen.getByText(capitalize(day).slice(0, 3))).toBeInTheDocument();
    });
  });

  test('shows a count of 0 for every day when history is empty', () => {
    render(<ProgressChart history={[]} />);
    // Seven day columns, each showing "0".
    expect(screen.getAllByText('0')).toHaveLength(7);
  });

  test('counts a logged workout on the correct day', () => {
    // Use today's date so the weekday label always lines up regardless
    // of which day the test suite happens to run on.
    const today = new Date();
    const todayISO = today.toISOString().split('T')[0];
    const todayLabel = capitalize(
      today.toLocaleDateString('en-US', { weekday: 'long' })
    ).slice(0, 3);

    render(<ProgressChart history={[{ id: 1, date: todayISO }]} />);

    // One day column should now read "1" instead of "0".
    expect(screen.getAllByText('0')).toHaveLength(6);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText(todayLabel)).toBeInTheDocument();
  });

  test('counts multiple workouts logged on the same day', () => {
    const todayISO = new Date().toISOString().split('T')[0];
    const history = [
      { id: 1, date: todayISO },
      { id: 2, date: todayISO }
    ];

    render(<ProgressChart history={history} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
