// src/AudioPlayer.jsx
import React, { useState, useRef, useEffect } from 'react';

const AudioPlayer = ({ tracks }) => {
  const audioRef = useRef(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Effect to handle track changes
  useEffect(() => {
    if (tracks.length > 0) {
      setCurrentTrackIndex(0); // Reset to the first track when tracks change
      setIsPlaying(false);
       // Pause playback when tracks change
    }
  }, [tracks]);
  
  const currentTrack = tracks[currentTrackIndex];

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (event) => {
    const audio = audioRef.current;
    audio.currentTime = (event.target.value / 100) * duration;
  };

  const handleTrackChange = (index) => {
    setCurrentTrackIndex(index);
    setIsPlaying(false);
    audioRef.current.pause();
    setCurrentTime(0);
  };

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={currentTrack ? currentTrack.src : ''}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <button onClick={togglePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      {duration > 0 && (
        <input
          type="range"
          min="0"
          max="100"
          value={(currentTime / duration) * 100}
          onChange={handleSeek}
        />
      )}
      <div>{Math.round(currentTime)} / {Math.round(duration)} seconds</div>
      <div className="track-list">
        {tracks.map((track, index) => (
          <div
            key={index}
            className={`track ${index === currentTrackIndex ? 'active' : ''}`}
            onClick={() => handleTrackChange(index)}
          >
            {track.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioPlayer;
