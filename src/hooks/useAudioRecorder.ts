import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.js';
import { RecordPluginType, AudioRecorderState } from '../types';
import { useTimer } from './useTimer';

interface UseAudioRecorderOptions {
  onRecordingComplete?: (blob: Blob) => void;
  waveformConfig?: Partial<WaveSurfer['options']>;
}

interface UseAudioRecorderReturn extends AudioRecorderState {
  startRecording: () => void;
  stopRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  playerRef: React.RefObject<HTMLDivElement>;
}

/**
 * Custom hook for managing audio recording functionality
 * @param options - Configuration options for the audio recorder
 * @returns Audio recorder state and control functions
 */
export const useAudioRecorder = (options: UseAudioRecorderOptions = {}): UseAudioRecorderReturn => {
  const { onRecordingComplete, waveformConfig = {} } = options;
  
  const playerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const recordPluginRef = useRef<RecordPluginType | null>(null);
  
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  
  const timer = useTimer();


  // Initialize WaveSurfer and RecordPlugin
  useEffect(() => {
    if (!playerRef?.current) return;


    // Merge default config with provided config
    const waveformOptions = {
      waveColor: 'rgb(200, 0, 200)',
      progressColor: 'rgb(100, 0, 100)',
      height: 48,
      width: 220,
      dragToSeek: true,
      normalize: true,
      barWidth: 4,
      barGap: 5,
      barHeight: 0.4,
      minPxPerSec: 500,
      ...waveformConfig,
    };

    const wavesurfer = WaveSurfer.create({
      container: playerRef.current,
      ...waveformOptions,
    });

    const recordPlugin = wavesurfer.registerPlugin(
      RecordPlugin.create({ renderRecordedAudio: true })
    ) as unknown as RecordPluginType;

    wavesurferRef.current = wavesurfer;
    recordPluginRef.current = recordPlugin;

    // Set up event listeners
    recordPlugin.on('record-start', () => {
      console.log('Recording started');
      setIsRecording(true);
      setIsPaused(false);
      timer.start();
    });

    recordPlugin.on('record-pause', () => {
      console.log('Recording paused');
      setIsPaused(true);
      timer.pause();
    });

    recordPlugin.on('record-resume', () => {
      console.log('Recording resumed');
      setIsPaused(false);
      timer.resume();
    });
 
    recordPlugin.on('record-end', (...args: unknown[]) => {
      const blob = args[0] as Blob;
      console.log('Recording ended', blob);
      setIsRecording(false);
      setIsPaused(false);
      timer.stop();
      timer.reset();
      
      if (onRecordingComplete) {
        onRecordingComplete(blob);
      }
    });


    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
      timer.stop();
    };
  }, [playerRef]);

  const startRecording = () => {
    if (!recordPluginRef.current) return;
    recordPluginRef.current.startRecording();
  };

  const stopRecording = () => {
    if (!recordPluginRef.current) return;
    recordPluginRef.current.stopRecording();
  };

  const pauseRecording = () => {
    if (!recordPluginRef.current) return;
    recordPluginRef.current.pauseRecording();
  };

  const resumeRecording = () => {
    if (!recordPluginRef.current) return;
    recordPluginRef.current.resumeRecording();
  };

  return {
    isRecording,
    isPaused,
    recordingTime: timer.time,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    playerRef
  };
};
