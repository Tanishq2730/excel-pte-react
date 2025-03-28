import React from "react";

interface AudioPlayerProps {
  src: string;
  className?: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, className }) => {
  if (!src) return <p>No audio available</p>; // Handle missing audio

  return (
    <audio controls className={className}>
      {/* ✅ Supports both MP3 and WAV formats */}
      <source src={src} type="audio/mpeg" />
      <source src={src} type="audio/wav" />
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioPlayer;
