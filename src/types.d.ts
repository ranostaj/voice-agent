// Audio-related types
import Wave from './components/ui/Wave';
export interface AudioRecorderState {
  isRecording: boolean;
  isPaused: boolean;
  recordingTime: number;
}

export interface AudioPlayerState {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
}

// WaveSurfer plugin types
export interface RecordPluginType {
  startRecording: () => void;
  stopRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  on: (event: string, callback: (...args: unknown[]) => void) => void;
}

// Component props
export interface RecorderProps {
  onRecordingComplete: (blob: Blob) => void;
}

export type WaveSize = 'sm' | 'md' | 'lg' | 'full';
export type WaveType = 'agent' | 'user';

export interface PlayerProps {
  audioData: string | Blob | null;
  autoPlay?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onFinish?: () => void;
  size?: WaveSize;
  isRound?: boolean;
  type?: WaveType;
  controls?: {
    playPause?: boolean;
  };
}

export type SavedAudio = {
  file: Blob;
  from: 'user' | 'agent';
};

