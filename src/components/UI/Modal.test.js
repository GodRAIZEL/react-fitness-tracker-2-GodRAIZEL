import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  test('renders its title and children', () => {
    render(
      <Modal title="Exercise Details" onClose={jest.fn()}>
        <p>Modal body content</p>
      </Modal>
    );
    expect(screen.getByText('Exercise Details')).toBeInTheDocument();
    expect(screen.getByText('Modal body content')).toBeInTheDocument();
  });

  test('calls onClose when the overlay is clicked', () => {
    const mockOnClose = jest.fn();
    const { container } = render(
      <Modal title="Details" onClose={mockOnClose}>
        <p>Body</p>
      </Modal>
    );

    // The Modal's root element (the overlay) is the container's first child.
    fireEvent.click(container.firstChild);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when the close button is clicked', () => {
    const mockOnClose = jest.fn();
    render(
      <Modal title="Details" onClose={mockOnClose}>
        <p>Body</p>
      </Modal>
    );

    fireEvent.click(screen.getByLabelText('Close'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when the modal content itself is clicked', () => {
    const mockOnClose = jest.fn();
    render(
      <Modal title="Details" onClose={mockOnClose}>
        <p>Body content</p>
      </Modal>
    );

    fireEvent.click(screen.getByText('Body content'));
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  test('renders without a title when none is provided', () => {
    render(<Modal onClose={jest.fn()}><p>No title body</p></Modal>);
    expect(screen.getByText('No title body')).toBeInTheDocument();
  });
});
