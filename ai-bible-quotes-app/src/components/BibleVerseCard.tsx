import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";

interface BibleVerse {
    reference: string;
    text: string;
}

interface BibleVerseCardProps {
    verses?: BibleVerse[];
    autoFetch?: boolean;
}

const BibleVerseCard = ({ verses: propVerses, autoFetch = false }: BibleVerseCardProps) => {
    const [fetchedVerses, setFetchedVerses] = useState<BibleVerse[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const verses = propVerses || fetchedVerses;

    useEffect(() => {
        if (autoFetch && !propVerses) {
            const loadVerses = async () => {
                try {
                    setIsLoading(true);
                    const data = await fetchData("get-verse");
                    setFetchedVerses(Array.isArray(data) ? data : [data]);
                } catch (err) {
                    setError(err instanceof Error ? err.message : 'Failed to fetch verses');
                    console.error("Failed to fetch verses:", err);
                } finally {
                    setIsLoading(false);
                }
            };

            loadVerses();
        }
    }, [autoFetch, propVerses]);

    return (
        <div className="flex justify-center items-center mt-6">
            <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg text-center">
                {isLoading ? (
                    <p className="text-gray-500">Processing...</p>
                ) : error ? (
                    <p className="text-red-500">Error: {error}</p>
                ) : verses.length > 0 ? (
                    verses.map((verse, index) => (
                        <div key={`${verse.reference}-${index}`} className="mb-4">
                            <h2 className="text-lg font-bold text-gray-900">{verse.reference}</h2>
                            <p className="text-gray-700 mt-2">{verse.text}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No detected Bible verses.</p>
                )}
            </div>
        </div>
    );
};

export default BibleVerseCard;
