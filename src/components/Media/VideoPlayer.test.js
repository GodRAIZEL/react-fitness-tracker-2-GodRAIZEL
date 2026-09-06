import { render, screen, fireEvent } from '@testing-library/react';
import VideoPlayer from './VideoPlayer';

// jsdom does not implement HTMLMediaElement.play/pause - stub them out.
beforeAll(() => {
  window.HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue();
  window.HTMLMediaElement.prototype.pause = jest.fn();
});

describe('VideoPlayer', () => {
  test('renders the title and description', () => {
    render(<VideoPlayer videoUrl="video.mp4" title="Push-ups Demo" description="Watch closely" />);
    expect(screen.getByText('Push-ups Demo')).toBeInTheDocument();
    expect(screen.getByText('Watch closely')).toBeInTheDocument();
  });

  test('toggles the play/pause button label when clicked', () => {
    render(<VideoPlayer videoUrl="video.mp4" title="Demo" />);
    const toggleBtn = screen.getByText(/Play Demonstration/);

    fireEvent.click(toggleBtn);
    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });

  test('calls pause() and shows the Play label again when toggled a second time', () => {
    render(<VideoPlayer videoUrl="video.mp4" title="Demo" />);
    const toggleBtn = screen.getByText(/Play Demonstration/);

    // First click: paused -> playing.
    fireEvent.click(toggleBtn);
    expect(screen.getByText(/Pause Demonstration/)).toBeInTheDocument();

    // Second click: playing -> paused.
    fireEvent.click(screen.getByText(/Pause Demonstration/));
    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    expect(screen.getByText(/Play Demonstration/)).toBeInTheDocument();
  });

  test('renders fallback text for unsupported browsers', () => {
    render(<VideoPlayer videoUrl="video.mp4" />);
    expect(screen.getByText(/does not support the video tag/)).toBeInTheDocument();
  });
});
