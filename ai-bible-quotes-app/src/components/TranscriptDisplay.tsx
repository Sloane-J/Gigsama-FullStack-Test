interface TranscriptDisplayProps {
  transcript?: string;
}

const TranscriptDisplay = ({ transcript = "Waiting for transcription..." }: TranscriptDisplayProps) => {
  return (
      <div className="flex justify-center items-center mt-6">
          <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg text-center">
              <h2 className="text-lg font-bold text-gray-900">Live Transcription</h2>
              <p className="text-gray-700 mt-2">{transcript}</p>
          </div>
      </div>
  );
};

export default TranscriptDisplay;
