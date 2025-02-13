#Gemini api endpoint
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Ensure a file was uploaded
if (!isset($_FILES['audio'])) {
    echo json_encode(["error" => "No audio file received"]);
    exit;
}

// Process the uploaded audio file (e.g., send to Whisper API for transcription)
$transcription = "For God so loved the world..."; // Example result from Whisper API

// Mock Bible verse detection (Replace with Gemini API or actual detection logic)
$detectedVerses = [
    [
        "reference" => "John 3:16 (KJV)",
        "text" => "For God so loved the world..."
    ]
];

// Return response as JSON
echo json_encode([
    "transcription" => $transcription,
    "verses" => $detectedVerses
]);
