import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Media.module.css';

/**
 * VideoPlayer - wraps an HTML5 <video> element with custom play/pause
 * controls in addition to the native browser controls, and fallback
 * content for browsers that don't support video.
 */
const VideoPlayer = ({ videoUrl, title, description }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.videoContainer}>
      <h3>{title}</h3>
      <p>{description}</p>

      <video
        ref={videoRef}
        controls
        width="100%"
        className={styles.videoEl}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag. Please try a modern browser such as Chrome, Firefox, or Edge.
      </video>

      <button className={styles.mediaToggleBtn} onClick={togglePlay}>
        {isPlaying ? '\u23F8 Pause' : '\u25B6 Play'} Demonstration
      </button>
    </div>
  );
};

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string
};

VideoPlayer.defaultProps = {
  title: 'Exercise Demonstration',
  description: ''
};

export default VideoPlayer;
