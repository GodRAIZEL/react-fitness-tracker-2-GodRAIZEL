import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Media.module.css';

/**
 * AudioPlayer - wraps an HTML5 <audio> element with custom play/pause
 * controls, used for motivational workout tracks on the Home page.
 */
const AudioPlayer = ({ audioUrl, title, description }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={styles.audioContainer}>
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>

      <audio
        ref={audioRef}
        controls
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <button className={styles.mediaToggleBtn} onClick={togglePlay}>
        {isPlaying ? '\u23F8 Pause' : '\u25B6 Play'}
      </button>
    </div>
  );
};

AudioPlayer.propTypes = {
  audioUrl: PropTypes.string.isRequired,
  title: PropTypes.string,
  description: PropTypes.string
};

AudioPlayer.defaultProps = {
  title: 'Motivation Track',
  description: ''
};

export default AudioPlayer;
