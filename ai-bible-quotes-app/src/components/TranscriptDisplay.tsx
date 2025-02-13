interface TranscriptDisplayProps {
    transcript?: string; // Optional transcript prop
  }
  
  const TranscriptDisplay = ({ transcript = "Waiting for transcription..." }: TranscriptDisplayProps) => {
    return (
      <div className="p-4 mt-4 bg-white shadow-md rounded-md">
        <h2 className="text-lg font-bold">Live Transcription</h2>
        <p className="text-gray-700 mt-2">{transcript}</p>
      </div>
    );
  };
  
  export default TranscriptDisplay;
  