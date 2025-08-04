import React from "react";
import { PlayerProps } from "../types";
import { Button, PauseIcon, PlayIcon, Timer, Wave } from "./ui";
import { useAudioPlayer } from "../hooks";

const VoicePlayer: React.FC<PlayerProps> = ({
  audioData,
  autoPlay,
  onPlay,
  onPause,
  onFinish,
  controls,
  size = "md",
  isRound = false,
  type = "user",
}) => {
  const { waveformRef, isPlaying, playPause, timer, duration } = useAudioPlayer({
    autoPlay,
    onPlay,
    onPause,
    onFinish,
    audioData,
  });

  return (
    <div className="flex items-center gap-2 w-full">
     
      <div className="relative flex-1 flex items-center justify-center">
       {!isRound && (<Timer
          seconds={timer.time}
          duration={duration}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20"
          variant={isPlaying ? "playing" : "default"}
        />)}
        <Wave ref={waveformRef} size={size} type={type} isRound={isRound} />
      </div>
      {audioData && (
        <div className="controls flex items-center gap-4">
          {controls?.playPause && (
            <Button
              onClick={playPause}
              variant="primaryOutline"
             
              size="md"
              isRound
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default VoicePlayer;
