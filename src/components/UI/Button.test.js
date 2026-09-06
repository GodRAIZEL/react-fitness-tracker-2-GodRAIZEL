import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  test('renders its children as the label', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const mockOnClick = jest.fn();
    render(<Button onClick={mockOnClick}>Click Me</Button>);

    fireEvent.click(screen.getByText('Click Me'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('applies the secondary variant class by default props override', () => {
    render(<Button variant="danger">Delete</Button>);
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  test('is disabled when the disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByText('Disabled')).toBeDisabled();
  });

  test('triggers onSubmit when used as a submit button inside a form', () => {
    const mockOnSubmit = jest.fn((e) => e.preventDefault());
    render(
      <form onSubmit={mockOnSubmit}>
        <Button type="submit">Submit</Button>
      </form>
    );
    fireEvent.click(screen.getByText('Submit'));
    expect(mockOnSubmit).toHaveBeenCalled();
  });
});
