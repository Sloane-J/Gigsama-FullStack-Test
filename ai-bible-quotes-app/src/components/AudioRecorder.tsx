import { useState } from "react";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import { useBibleVerse } from "../hooks/useBibleVerse";
import { Mic, StopCircle, Circle } from "lucide-react"; // Icons

const AudioRecorder = () => {
  const [transcription, setTranscription] = useState("");
  const { isRecording, error: recordingError, startRecording, stopRecording } =
    useAudioRecorder();
  const { verses, isLoading, error: verseError } = useBibleVerse(transcription);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Title */}
      <h1 className="text-xl font-semibold text-gray-900 mb-10">VerseCatch</h1>

      {/* Card Container */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md flex flex-col items-center gap-4">
        {/* Status Icon */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-200">
          <Circle className="text-gray-500" size={24} />
        </div>

        {/* Status Text */}
        <p className="text-gray-600 text-center text-sm">
          Transcribing and detecting <br /> Bible quotations in real time.
        </p>

        {/* Button */}
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-medium transition-all hover:opacity-80"
          aria-label={isRecording ? "Stop Listening" : "Start Listening"}
        >
          {isRecording ? <StopCircle size={18} /> : <Mic size={18} />}
          {isRecording ? "Stop Listening" : "Start Listening"}
        </button>

        {/* Errors */}
        {recordingError && <p className="text-red-500 text-sm">{recordingError}</p>}
        {verseError && <p className="text-red-500 text-sm">{verseError}</p>}
      </div>
    </div>
  );
};

export default AudioRecorder;
