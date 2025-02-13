// src/utils/api.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:5000';

interface APIError {
    message: string;
    status?: number;
}

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to handle audio streaming
export const streamAudio = async (audioBlob: Blob): Promise<string> => {
    const formData = new FormData();
    formData.append('audio', audioBlob);

    try {
        const response = await api.post('/api/transcribe', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.transcription;
    } catch (error) {
        throw handleError(error);
    }
};

// Function to process text and get Bible verses
export const processText = async (text: string) => {
    try {
        const response = await api.post('/api/process-text', { text });
        return response.data.verses;
    } catch (error) {
        throw handleError(error);
    }
};

// Function to fetch Bible verse by reference
export const getVerse = async (reference: string) => {
    try {
        const response = await api.get(`/api/get-verse/${encodeURIComponent(reference)}`);
        return response.data.verse;
    } catch (error) {
        throw handleError(error);
    }
};

const handleError = (error: any): Error => {
    const apiError: APIError = {
        message: 'An unexpected error occurred',
    };

    if (axios.isAxiosError(error)) {
        apiError.message = error.response?.data?.message || error.message;
        apiError.status = error.response?.status;
    }

    return new Error(apiError.message);
};