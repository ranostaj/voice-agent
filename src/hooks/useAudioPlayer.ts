import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { useTimer } from "./useTimer";

interface UseAudioPlayerProps {
  autoPlay?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onFinish?: () => void;
  audioData: string | Blob | null;
  options?: Partial<WaveSurfer["options"]>;

}

export const useAudioPlayer = ({
  autoPlay = true,
  onPlay,
  onPause,
  onFinish,
  audioData,
  options,
}: UseAudioPlayerProps) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const timer = useTimer();
  // Initialize WaveSurfer instance only once
  useEffect(() => {
    if (!waveformRef.current || wavesurferRef.current) return;

    // Create WaveSurfer instance
    const wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "rgb(0, 0, 0)",
      progressColor: "rgb(0, 0, 0)",
      dragToSeek: true,
      normalize: true,
      height: 48,
      width: 230,
      barWidth: 4,
      barGap: 5,
      barHeight: 0.4,
      minPxPerSec: 500,
      hideScrollbar: true,
      ...options,
    });

    wavesurferRef.current = wavesurfer;
    // Event listeners
    wavesurfer.on("ready", () => {
      setDuration(wavesurfer.getDuration());
      timer.reset();
      if (autoPlay) {
        wavesurfer.play();
        timer.start();
      }
    });

    wavesurfer.on("play", () => {
      timer.reset();
      setIsPlaying(true);
      timer.start();
      if (onPlay) onPlay();
    });

    wavesurfer.on("pause", () => {
      setIsPlaying(false);
      timer.pause();
      if (onPause) onPause();
    });

    wavesurfer.on("finish", () => {
      setIsPlaying(false);
      if (onFinish) onFinish();
    });


    // Cleanup function
    return () => {
      wavesurferRef.current?.destroy();
      wavesurferRef.current = null;
      
    };
  }, []);  

  useEffect(() => {
    if (!wavesurferRef.current || !audioData) return;

    // Handle different types of audioData
    if (typeof audioData === "string") {
      // Handle URL or base64 string
      wavesurferRef.current.load(audioData);
    } else if (audioData instanceof Blob) {
      // Handle Blob data
      const url = URL.createObjectURL(audioData);
      wavesurferRef.current.load(url);

      // Clean up the URL object
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [wavesurferRef, audioData]);

  const playPause = () => {
    if (!wavesurferRef.current) return;
    wavesurferRef.current.playPause();
  };
  return {
    waveformRef,
    wavesurferRef,
    isPlaying,
    playPause,
    timer,
    duration,
  };
};
