export async function fetchBibleVerses(transcription) {
    // Example: Detect keywords & fetch from a Bible API (or database)
    const bibleVerses = [
        { reference: "John 3:16 (KJV)", text: "For God so loved the world..." },
        { reference: "Matthew 11:28 (NIV)", text: "Come to me, all who are weary..." }
    ];

    return bibleVerses.filter(verse => transcription.includes(verse.reference.split(" ")[0]));
}
