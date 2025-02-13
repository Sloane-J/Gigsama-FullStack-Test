import { useState } from "react";
import useAudioRecorder from "../hooks/useAudioRecorder";
import BibleVerseCard from "./BibleVerseCard";

// Define type for Bible verses
interface BibleVerse {
  reference: string;
  text: string;
}

const AudioRecorder = () => {
  const { isRecording, startRecording, stopRecording, audioUrl } = useAudioRecorder();
  const [transcription, setTranscription] = useState<string>("");
  const [verses, setVerses] = useState<BibleVerse[]>([]); // Ensure correct typing

  const processAudio = async () => {
    if (!audioUrl) return;

    try {
      const response = await fetch(audioUrl);
      const audioBlob = await response.blob();
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.wav");

      const res = await fetch("/backend/api/process-text.php", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Failed to process audio");
      }

      const data = await res.json();
      setTranscription(data.transcription || "");
      setVerses(data.verses || []); // Expecting an array of detected Bible verses
    } catch (error) {
      console.error("Error processing audio:", error);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`px-4 py-2 rounded-md text-white font-semibold ${
          isRecording ? "bg-red-500" : "bg-black"
        }`}
      >
        {isRecording ? "Stop Listening" : "Start Listening"}
      </button>

      {audioUrl && <audio controls src={audioUrl} className="mt-4"></audio>}

      <button
        onClick={processAudio}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
        disabled={!audioUrl}
      >
        Process Audio
      </button>

      {transcription && <p className="mt-2 text-gray-700">{transcription}</p>}

      {verses.length > 0 &&
        verses.map((verse, index) => (
          <BibleVerseCard key={index} verse={verse.reference} text={verse.text} />
        ))}
    </div>
  );
};

export default AudioRecorder;
