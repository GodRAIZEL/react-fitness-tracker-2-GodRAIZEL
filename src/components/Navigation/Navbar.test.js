import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

const renderNavbar = (initialRoute = '/') =>
  render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Navbar />
    </MemoryRouter>
  );

describe('Navbar', () => {
  test('renders links to all main routes', () => {
    renderNavbar();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Exercises')).toBeInTheDocument();
    expect(screen.getByText('Planner')).toBeInTheDocument();
    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('Progress')).toBeInTheDocument();
  });

  test('marks the Exercises link as active on the /exercises route', () => {
    renderNavbar('/exercises');
    expect(screen.getByText('Exercises').className).toMatch(/active/);
  });

  test('toggles the mobile menu open state when the hamburger is clicked', () => {
    renderNavbar();
    const hamburger = screen.getByLabelText('Toggle navigation menu');
    fireEvent.click(hamburger);
    // After the click, the nav links list should include the "open" class.
    const list = screen.getByText('Home').closest('ul');
    expect(list.className).toMatch(/navLinksOpen/);
  });
});
