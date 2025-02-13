
// src/hooks/useAudioRecorder.ts
import { useState, useCallback } from 'react';
import { streamAudio } from '../utils/api';

export const useAudioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

    const startRecording = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            const chunks: Blob[] = [];

            recorder.ondataavailable = async (e) => {
                chunks.push(e.data);
                if (recorder.state === 'inactive') {
                    const blob = new Blob(chunks, { type: 'audio/webm' });
                    try {
                        await streamAudio(blob);
                    } catch (err) {
                        setError(err instanceof Error ? err.message : 'Failed to stream audio');
                    }
                }
            };

            recorder.start(3000); // Send chunks every 3 seconds
            setMediaRecorder(recorder);
            setIsRecording(true);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to start recording');
            console.error('Error starting recording:', err);
        }
    }, []);

    const stopRecording = useCallback(() => {
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            mediaRecorder.stream.getTracks().forEach(track => track.stop());
            setIsRecording(false);
        }
    }, [mediaRecorder]);

    return {
        isRecording,
        error,
        startRecording,
        stopRecording
    };
};
