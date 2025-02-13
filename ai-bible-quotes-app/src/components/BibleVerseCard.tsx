import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";

interface BibleVerse {
    reference: string;
    text: string;
}

interface BibleVerseCardProps {
    verses?: BibleVerse[];  // Make optional since we might fetch verses internally
    autoFetch?: boolean;    // Control whether component fetches its own verses
}

const BibleVerseCard = ({ verses: propVerses, autoFetch = false }: BibleVerseCardProps) => {
    const [fetchedVerses, setFetchedVerses] = useState<BibleVerse[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Use prop verses if provided, otherwise use fetched verses
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

    if (isLoading) {
        return <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-500">Loading verses...</p>
        </div>;
    }

    if (error) {
        return <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
            <p className="text-red-500">Error: {error}</p>
        </div>;
    }

    return (
        <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-2">Detected Bible Verses</h2>
            {verses.length > 0 ? (
                verses.map((verse, index) => (
                    <div key={`${verse.reference}-${index}`} className="mb-2 p-2 bg-gray-100 rounded-md">
                        <p className="font-bold">{verse.reference}</p>
                        <p className="text-gray-700">{verse.text}</p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No verses detected yet.</p>
            )}
        </div>
    );
};

export default BibleVerseCard;