interface TranscriptDisplayProps {
  transcript?: string;
}

const TranscriptDisplay = ({ transcript = "Waiting for transcription..." }: TranscriptDisplayProps) => {
  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          {/* Title */}
          <h1 className="text-xl font-semibold text-gray-900 mb-10">VerseCatch</h1>

          {/* Card Container */}
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg text-center">
              <h2 className="text-xl font-semibold text-gray-900">Live Transcription</h2>
              <p className="text-gray-600 mt-4 text-sm">
                  {transcript}
              </p>
          </div>
      </div>
  );
};

export default TranscriptDisplay;
