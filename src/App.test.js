import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  window.HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue();
  window.HTMLMediaElement.prototype.pause = jest.fn();
});

beforeEach(() => {
  window.localStorage.clear();
});

describe('App', () => {
  test('renders the home page by default', () => {
    render(<App />);
    expect(screen.getByText(/Train with a plan/)).toBeInTheDocument();
  });

  test('renders the navigation bar with all route links', () => {
    render(<App />);
    expect(screen.getByText('Exercises')).toBeInTheDocument();
    expect(screen.getByText('Planner')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('Progress')).toBeInTheDocument();
  });

  test('renders the footer', () => {
    render(<App />);
    expect(screen.getByText(/Built for a stronger you/)).toBeInTheDocument();
  });

  test('sets the document title on mount via useEffect', () => {
    document.title = '';
    render(<App />);
    expect(document.title).toBe('PACE — Fitness Tracker & Workout Planner');
  });

  test('adding the same exercise twice only plans it once', async () => {
    render(<App />);

    fireEvent.click(screen.getByText('Exercises'));
    await waitFor(() => expect(screen.getByText('Push-ups')).toBeInTheDocument());

    const pushUpsCard = screen.getByText('Push-ups').closest('div');
    const cardAddButton = () => pushUpsCard.querySelector('button[class*="btn"]');

    fireEvent.click(cardAddButton());
    fireEvent.click(cardAddButton());

    fireEvent.click(screen.getByText('Planner'));
    await waitFor(() => {
      expect(screen.getAllByText('Push-ups')).toHaveLength(1);
    });
  });

  test('removing a single exercise from a day updates the planner', async () => {
    render(<App />);

    fireEvent.click(screen.getByText('Exercises'));
    await waitFor(() => expect(screen.getByText('Push-ups')).toBeInTheDocument());

    const pushUpsCard = screen.getByText('Push-ups').closest('div');
    fireEvent.click(pushUpsCard.querySelector('button[class*="btn"]'));

    fireEvent.click(screen.getByText('Planner'));
    await waitFor(() => expect(screen.getByLabelText('Remove Push-ups')).toBeInTheDocument());

    fireEvent.click(screen.getByLabelText('Remove Push-ups'));
    expect(screen.queryByText('Push-ups')).not.toBeInTheDocument();
  });

  test('clearing a day removes every exercise planned for it', async () => {
    render(<App />);

    fireEvent.click(screen.getByText('Exercises'));
    await waitFor(() => expect(screen.getByText('Push-ups')).toBeInTheDocument());

    const pushUpsCard = screen.getByText('Push-ups').closest('div');
    fireEvent.click(pushUpsCard.querySelector('button[class*="btn"]'));

    fireEvent.click(screen.getByText('Planner'));
    await waitFor(() => expect(screen.getByText('Clear Day')).toBeInTheDocument());

    fireEvent.click(screen.getByText('Clear Day'));
    expect(screen.queryByText('Push-ups')).not.toBeInTheDocument();
    expect(screen.getAllByText('No exercises planned yet.')).toHaveLength(7);
  });

  test('deleting a logged workout removes it from history', () => {
    render(<App />);

    fireEvent.click(screen.getByText('History'));
    fireEvent.click(screen.getByText('Log Workout'));

    expect(screen.queryByText(/No workouts logged yet/)).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Delete log for Push-ups'));
    expect(screen.getByText(/No workouts logged yet/)).toBeInTheDocument();
  });
});
