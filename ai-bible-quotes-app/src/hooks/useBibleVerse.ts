
// src/hooks/useBibleVerse.ts
import { useState, useEffect } from 'react';
import { processText, getVerse } from '../utils/api';

interface BibleVerse {
    reference: string;
    text: string;
}

export const useBibleVerse = (transcription: string) => {
    const [verses, setVerses] = useState<BibleVerse[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const processTranscription = async () => {
            if (!transcription.trim()) return;

            setIsLoading(true);
            try {
                const detectedVerses = await processText(transcription);
                const fullVerses = await Promise.all(
                    detectedVerses.map(async (reference: string) => {
                        const verse = await getVerse(reference);
                        return {
                            reference,
                            text: verse
                        };
                    })
                );
                setVerses(fullVerses);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to process transcription');
                console.error('Error processing transcription:', err);
            } finally {
                setIsLoading(false);
            }
        };

        processTranscription();
    }, [transcription]);

    return { verses, isLoading, error };
};
