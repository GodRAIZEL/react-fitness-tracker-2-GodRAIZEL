import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  test('renders with the given search term and placeholder', () => {
    render(<SearchBar searchTerm="push" onSearch={jest.fn()} placeholder="Find an exercise..." />);
    expect(screen.getByPlaceholderText('Find an exercise...')).toHaveValue('push');
  });

  test('calls onSearch with the new value on change', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar searchTerm="" onSearch={mockOnSearch} />);

    fireEvent.change(screen.getByPlaceholderText('Search exercises...'), { target: { value: 'squats' } });
    expect(mockOnSearch).toHaveBeenCalledWith('squats');
  });

  test('calls onSearch again when the form is submitted', () => {
    const mockOnSearch = jest.fn();
    render(<SearchBar searchTerm="burpees" onSearch={mockOnSearch} />);

    fireEvent.click(screen.getByText('Search'));
    expect(mockOnSearch).toHaveBeenCalledWith('burpees');
  });

  test('does not show a Clear button when the search term is empty', () => {
    render(<SearchBar searchTerm="" onSearch={jest.fn()} />);
    expect(screen.queryByText('Clear')).not.toBeInTheDocument();
  });

  test('shows a Clear button when there is a search term, and calls onClear when clicked', () => {
    const mockOnClear = jest.fn();
    render(<SearchBar searchTerm="lunges" onSearch={jest.fn()} onClear={mockOnClear} />);

    const clearBtn = screen.getByText('Clear');
    expect(clearBtn).toBeInTheDocument();
    fireEvent.click(clearBtn);
    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });

});
