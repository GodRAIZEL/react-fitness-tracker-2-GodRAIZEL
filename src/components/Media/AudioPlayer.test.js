import { render, screen, fireEvent } from '@testing-library/react';
import AudioPlayer from './AudioPlayer';

beforeAll(() => {
  window.HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue();
  window.HTMLMediaElement.prototype.pause = jest.fn();
});

describe('AudioPlayer', () => {
  test('renders the track title', () => {
    render(<AudioPlayer audioUrl="track.mp3" title="Morning Fire" />);
    expect(screen.getByText('Morning Fire')).toBeInTheDocument();
  });

  test('calls play() when the toggle button is clicked', () => {
    render(<AudioPlayer audioUrl="track.mp3" title="Morning Fire" />);
    fireEvent.click(screen.getByText(/Play/));
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });

  test('calls pause() and reverts the button label when toggled a second time', () => {
    render(<AudioPlayer audioUrl="track.mp3" title="Morning Fire" />);
    const toggleBtn = screen.getByRole('button', { name: /Play/ });

    fireEvent.click(toggleBtn);
    const pauseBtn = screen.getByRole('button', { name: /Pause/ });
    expect(pauseBtn).toBeInTheDocument();

    fireEvent.click(pauseBtn);
    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: /Play/ })).toBeInTheDocument();
  });

  test('renders fallback text for unsupported browsers', () => {
    render(<AudioPlayer audioUrl="track.mp3" />);
    expect(screen.getByText(/does not support the audio element/)).toBeInTheDocument();
  });
});
