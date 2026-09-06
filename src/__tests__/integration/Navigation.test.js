import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../App';

beforeAll(() => {
  window.HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue();
  window.HTMLMediaElement.prototype.pause = jest.fn();
});

beforeEach(() => {
  window.localStorage.clear();
});

describe('Navigation Integration', () => {
  test('navigates to the exercises page via the navbar', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Exercises'));
    expect(screen.getByText('Browse Exercises')).toBeInTheDocument();
  });

  test('navigates to the workout planner page via the navbar', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Planner'));
    expect(screen.getByText('Workout Planner')).toBeInTheDocument();
  });

  test('navigates to the progress page via the navbar', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Progress'));
    expect(screen.getByText('Your Progress')).toBeInTheDocument();
  });

  test('shows the 404 page for an unknown route', () => {
    window.history.pushState({}, 'Test page', '/this-route-does-not-exist');
    render(<App />);
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  test('the 404 page navigates back home when the button is clicked', () => {
    window.history.pushState({}, 'Test page', '/this-route-does-not-exist');
    render(<App />);

    fireEvent.click(screen.getByText('Go Home'));
    expect(screen.getByText(/Train with a plan/)).toBeInTheDocument();
  });
});
