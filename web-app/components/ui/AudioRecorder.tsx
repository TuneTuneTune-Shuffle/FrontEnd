"use client";

import { useReactMediaRecorder } from "react-media-recorder";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

export const AudioRecorder = ({
  onStop,
  maxRecordingTime = 30,
}: {
  onStop: (blobUrl: string) => void;
  maxRecordingTime?: number;
}) => {
  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ 
    audio: true,
    onStop: (blobUrl) => {
      onStop(blobUrl);
      // Clear any existing timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setRecordingTime(0);
    },
  });
  
  const [recordingTime, setRecordingTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer effect
  useEffect(() => {
    if (status === 'recording') {
      timerRef.current = setInterval(() => {
        setRecordingTime((prevTime) => {
          if (prevTime >= maxRecordingTime) {
            stopRecording();
            return maxRecordingTime;
          }
          return prevTime + 1;
        });
      }, 1000);
    }

    return () => {
      // Cleanup on unmount or status change
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [status, stopRecording, maxRecordingTime]);

  const handleStartRecording = () => {
    // Reset time before starting new recording
    setRecordingTime(0);
    startRecording();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Record Audio</h2>
      <p className="text-gray-400 mb-4">
        {status === 'recording' 
          ? `Recording... (${recordingTime}/${maxRecordingTime} sec)`
          : 'Click below to start recording (max 30 seconds)'}
      </p>
      
      {/* Single progress bar - only shown when recording */}
      {status === 'recording' && (
        <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
          <div 
            className="bg-blue-500 h-2.5 rounded-full" 
            style={{ width: `${(recordingTime / maxRecordingTime) * 100}%` }}
          />
        </div>
      )}
      
      <div className="flex space-x-4">
        <Button 
          onClick={handleStartRecording} 
          disabled={status === 'recording'}
        >
          Start Recording
        </Button>
        <Button 
          onClick={stopRecording} 
          disabled={status !== 'recording'}
        >
          Stop Recording
        </Button>
      </div>
    </div>
  );
};