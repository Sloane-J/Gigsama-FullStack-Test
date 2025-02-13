interface BibleVerse {
    reference: string; // e.g., "John 3:16 (KJV)"
    text: string; // e.g., "For God so loved the world..."
  }
  
  interface BibleVerseCardProps {
    verses: BibleVerse[]; // Array of detected verses
  }
  
  const BibleVerseCard = ({ verses }: BibleVerseCardProps) => {
    return (
      <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-2">Detected Bible Verses</h2>
        {verses.length > 0 ? (
          verses.map((verse, index) => (
            <div key={index} className="mb-2 p-2 bg-gray-100 rounded-md">
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
  