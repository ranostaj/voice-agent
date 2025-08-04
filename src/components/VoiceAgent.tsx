import React, { useEffect, useState } from "react";
import VoiceRecorder from "./VoiceRecorder";
import { useWebSocketContext } from "../hooks/useWebSocketContext";
import VoicePlayer from "./VoicePlayer";
import { Button, DeleteIcon, SendIcon } from "./ui";
import { SavedAudio } from "../types";

const VoiceAgent: React.FC = () => {
  const [recievedAudio, setRecievedAudio] = useState<Blob | null>(null);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const [finishedRecievedAudio, setFinishedRecievedAudio] = useState(false);
  const [savedAudio, setSavedAudio] = useState<SavedAudio[]>([]);
  const { sendMessage, lastMessage, isOpen } = useWebSocketContext();

  const addAudio = (audio: Blob, from: SavedAudio['from']) => {
    if (!audio) return;

    // If savedAudio is null, initialize it with the new audio
    if (!savedAudio) {
      setSavedAudio([{ file: audio, from }]);
      return;
    }
    setSavedAudio([...savedAudio, { file: audio, from }]);
  };
  // Function to handle adding audio element
  const onRecordingComplete = (blob: Blob) => {
    setRecordedAudio(blob);
  };

  const deleteRecording = () => {
    setRecordedAudio(null);
  };

  // Function to send recorded audio to WebSocket server
 
  const sendRecorderAudio = () => {
    if (recordedAudio) {
      sendMessage(recordedAudio);
      setRecordedAudio(null);
      addAudio(recordedAudio, 'user');
    }
  };


  // Handle incoming messages from WebSocket
  useEffect(() => {
    if (lastMessage !== null) {
      const audioBlob = new Blob([lastMessage.data], { type: "audio/wav" });
      setRecievedAudio(audioBlob);
      setFinishedRecievedAudio(false);
    }     
  }, [lastMessage]);

  // Function to finish received audio playback
  const finishRecievedAudio = (audio: Blob) => {
    addAudio(audio, 'agent');
    setFinishedRecievedAudio(true);
    setRecievedAudio(null);
  }

  if(!isOpen) {
    return <div className="text-center text-gray-500">WebSocket is not connected, try again.</div>;
  }

  return (
    <div className="w-full">
      {recievedAudio && !finishedRecievedAudio && (
        <VoicePlayer
          audioData={recievedAudio}
          autoPlay
          isRound
          type="agent"
          size="md"
          onFinish={() => finishRecievedAudio(recievedAudio)}
        />
      )}
      <div>
        {recordedAudio && (
          <div className="flex items-center gap-2 mb-4">
            <Button
              onClick={deleteRecording}
              variant="primaryOutline"
              size="md"
              isRound
              className="flex-shrink-0"
            >
              <DeleteIcon />
            </Button>
            <VoicePlayer
              audioData={recordedAudio}
              autoPlay={false}
              size="full"
              controls={{ playPause: true }}
            />

            <Button
              isRound
              onClick={sendRecorderAudio}
              variant="primaryOutline"
              className="flex-shrink-0"
              title="Send Recording"
            >
              <SendIcon size={24} className="text-primary" />
            </Button>
          </div>
        )}
        {!recordedAudio && finishedRecievedAudio && (
          <VoiceRecorder onRecordingComplete={onRecordingComplete} />
        )}
      </div>
      {savedAudio && (
        <div className="mt-4">
          <ul className="space-y-2">
            {savedAudio.map((audioBlob, index) => (
              <li key={index} className="items-center gap-2">
                <div className="text-primary text-sm">{audioBlob.from === 'agent' ? 'Jesica:' : 'Me:'}</div>
                <VoicePlayer
                  audioData={audioBlob.file}
                  size="full"
                  type={audioBlob.from}
                  autoPlay={false}
                  controls={{ playPause: true }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VoiceAgent;
