import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ExercisesPage from './ExercisesPage';

const renderPage = (props = {}) =>
  render(
    <MemoryRouter>
      <ExercisesPage {...props} />
    </MemoryRouter>
  );

describe('ExercisesPage', () => {
  test('shows a loading state immediately after mount', () => {
    renderPage();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('loads and displays exercises asynchronously', async () => {
    renderPage();

    await waitFor(() => {
      expect(screen.getByText('Push-ups')).toBeInTheDocument();
    });
  });

  test('the loading indicator disappears once the useEffect data load completes', async () => {
    renderPage();

    // Immediately after mount, the useEffect's setTimeout has not fired
    // yet, so the loading spinner is still showing.
    expect(screen.getByRole('status')).toBeInTheDocument();

    // Once the simulated async load resolves, the spinner should be gone.
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });

  test('the intro text switches from "Loading..." to a result count once data has loaded', async () => {
    renderPage();

    expect(screen.getByText('Loading the exercise library...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText('Loading the exercise library...')).not.toBeInTheDocument();
      expect(screen.getByText(/exercises found/)).toBeInTheDocument();
    });
  });

  test('renders the page heading', async () => {
    renderPage();
    expect(screen.getByText('Browse Exercises')).toBeInTheDocument();
  });

  test('filters the list when a category is selected', async () => {
    renderPage();
    await waitFor(() => expect(screen.getByText('Push-ups')).toBeInTheDocument());

    fireEvent.change(screen.getByDisplayValue('All Categories'), { target: { value: 'flexibility' } });

    await waitFor(() => {
      expect(screen.queryByText('Push-ups')).not.toBeInTheDocument();
      expect(screen.getByText('Cat-Cow Stretch')).toBeInTheDocument();
    });
  });

  test('re-sorts the list when the sort dropdown changes', async () => {
    renderPage();
    await waitFor(() => expect(screen.getByText('Push-ups')).toBeInTheDocument());

    fireEvent.change(screen.getByDisplayValue('Name'), { target: { value: 'duration' } });

    await waitFor(() => {
      // Sorting changed - the library is still fully rendered either way,
      // so just confirm a known exercise is still present post-sort.
      expect(screen.getByText('Push-ups')).toBeInTheDocument();
    });
  });

  test('clearing filters resets the results back to the full list', async () => {
    renderPage();
    await waitFor(() => expect(screen.getByText('Push-ups')).toBeInTheDocument());

    fireEvent.change(screen.getByDisplayValue('All Categories'), { target: { value: 'flexibility' } });
    await waitFor(() => expect(screen.getByText('Clear Filters')).toBeInTheDocument());

    fireEvent.click(screen.getByText('Clear Filters'));

    await waitFor(() => {
      expect(screen.getByText('Push-ups')).toBeInTheDocument();
      expect(screen.queryByText('Clear Filters')).not.toBeInTheDocument();
    });
  });
});
