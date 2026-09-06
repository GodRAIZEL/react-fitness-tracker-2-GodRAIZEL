import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

beforeAll(() => {
  window.HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue();
  window.HTMLMediaElement.prototype.pause = jest.fn();
});

const renderHome = (props = {}) =>
  render(
    <MemoryRouter>
      <Home {...props} />
    </MemoryRouter>
  );

describe('Home', () => {
  test('renders the hero heading', () => {
    renderHome();
    expect(screen.getByText(/Train with a plan/)).toBeInTheDocument();
  });

  test('displays the workout count from history', () => {
    const history = [
      { date: '2026-01-01', caloriesBurn: 50 },
      { date: '2026-01-02', caloriesBurn: 60 }
    ];
    renderHome({ workoutHistory: history });
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('renders motivation audio tracks', () => {
    renderHome();
    expect(screen.getByText('Morning Fire')).toBeInTheDocument();
    expect(screen.getByText('Push Through')).toBeInTheDocument();
  });
});
