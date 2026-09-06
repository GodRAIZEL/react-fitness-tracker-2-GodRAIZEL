import { render, screen, fireEvent } from '@testing-library/react';
import EmptyState from './EmptyState';

describe('EmptyState', () => {
  test('renders the message', () => {
    render(<EmptyState message="Nothing here yet." />);
    expect(screen.getByText('Nothing here yet.')).toBeInTheDocument();
  });

  test('does not render an action button when actionLabel/onAction are not provided', () => {
    render(<EmptyState message="Nothing here yet." />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('renders an action button and calls onAction when clicked, given both props', () => {
    const mockOnAction = jest.fn();
    render(<EmptyState message="No results." actionLabel="Try Again" onAction={mockOnAction} />);

    const actionBtn = screen.getByText('Try Again');
    expect(actionBtn).toBeInTheDocument();

    fireEvent.click(actionBtn);
    expect(mockOnAction).toHaveBeenCalledTimes(1);
  });

  test('does not render an action button when only actionLabel is provided without onAction', () => {
    render(<EmptyState message="No results." actionLabel="Try Again" />);
    expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
  });
});
