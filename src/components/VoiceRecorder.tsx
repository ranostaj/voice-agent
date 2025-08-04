import { clsx } from "clsx";
import React from "react";
import { useAudioRecorder } from "../hooks";
import { RecorderProps } from "../types";
import { Button, MicIcon, PauseIcon, StopIcon, Timer, Wave } from "./ui";

const VoiceRecorder: React.FC<RecorderProps> = ({ onRecordingComplete }) => {
  const {
    isRecording,
    isPaused,
    recordingTime,
    startRecording,
    resumeRecording,
    stopRecording,
    pauseRecording,
    playerRef,
  } = useAudioRecorder({
    onRecordingComplete,
  });

  return (
    <div>
      <div className="flex gap-2  justify-center">
        {isRecording && (
          <Button
            isRound={true}
            onClick={stopRecording}
            variant="primaryOutline"
            className="flex-shrink-0"
          >
            <StopIcon   />
          </Button>
        )}
        <div
          className={clsx("flex-1 flex items-center transition-all", {
            "opacity-100": isRecording || isPaused,
            "opacity-0 hidden": !isRecording && !isPaused,
          })}
        >
          <div className="flex items-center flex-1 gap-2 relative">
            <Timer
              seconds={recordingTime}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20"
              variant={isRecording ? "recording" : "default"}
            />

            <Wave ref={playerRef} size="full" type="user" isRound={false} />
          </div>
        </div>

        {(!isRecording || isPaused) && (
          <div className="flex flex-col items-center gap-2">
            <Button
              isRound={true}
              onClick={isPaused ? resumeRecording : startRecording}
              variant="primaryOutline"
              className="flex-shrink-0"
            >
              <MicIcon   />
            </Button>
            {!isPaused && (
              <div className="text-xs text-gray-500 mt-1">Press to record</div>
            )}
          </div>
        )}

        {isRecording && !isPaused && (
          <Button
            onClick={pauseRecording}
            variant="primaryOutline"
            size="md"
            isRound
            className="flex-shrink-0"
            title="Pause Recording"
          >
            <PauseIcon  />
          </Button>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorder;
