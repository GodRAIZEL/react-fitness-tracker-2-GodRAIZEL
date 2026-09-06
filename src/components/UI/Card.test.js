import { render, screen, fireEvent } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  test('renders its children', () => {
    render(<Card><p>Card content</p></Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const mockOnClick = jest.fn();
    render(<Card onClick={mockOnClick}><p>Clickable</p></Card>);

    fireEvent.click(screen.getByText('Clickable'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('renders without crashing when isSelected is true', () => {
    render(<Card isSelected><p>Selected card</p></Card>);
    expect(screen.getByText('Selected card')).toBeInTheDocument();
  });
});
