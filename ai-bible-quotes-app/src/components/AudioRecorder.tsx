import { useState } from 'react';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { useBibleVerse } from '../hooks/useBibleVerse';
import BibleVerseCard from './BibleVerseCard';

const AudioRecorder = () => {
    const [transcription, setTranscription] = useState('');
    const { 
        isRecording, 
        error: recordingError, 
        startRecording, 
        stopRecording 
    } = useAudioRecorder();
    
    const { 
        verses, 
        isLoading, 
        error: verseError 
    } = useBibleVerse(transcription);

    return (
        <div className="flex flex-col items-center gap-4">
            <button 
                onClick={isRecording ? stopRecording : startRecording}
                className="p-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                aria-label={isRecording ? 'Stop Recording' : 'Start Recording'}
            >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            
            {recordingError && (
                <p className="text-red-500 text-sm">Error: {recordingError}</p>
            )}
            
            {verseError && (
                <p className="text-red-500 text-sm">Error: {verseError}</p>
            )}
            
            {isLoading ? (
                <p className="text-gray-500">Processing audio...</p>
            ) : (
                <BibleVerseCard verses={verses} />
            )}
        </div>
    );
};

export default AudioRecorder;