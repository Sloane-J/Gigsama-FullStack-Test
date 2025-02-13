# Gigsama-FullStack-Test

## AI Bible Quotation App Test

### Overview
Build an **AI Bible Quotation App** that listens live during sermons and displays Bible quotations in real time. When the user taps a button, the app streams voice to a server. The server transcribes the audio using **OpenAI Whisper (tiny model)**, streams the transcription to **Google Gemini Flash** (or an equivalent model) to extract a **Bible quote address** (if detected or implied), queries a **Bible database** for the full quotation, and returns it for display.

### Requirements

#### Frontend:
- A simple interface (web or app) with a button to start/stop live voice streaming.
- Real-time display of the Bible quotation.

#### Backend:
- Accept a continuous audio stream from the frontend.
- Transcribe the audio in real time using **OpenAI Whisper (tiny)**.
- Process the transcription with **Google Gemini Flash** (or an alternative AI model) to extract a Bible quote address when one is detected.
- Query your **Bible quotations database** to retrieve the full quotation.
- Return the full Bible quotation for live display on the frontend.

#### Flexibility:
- You may use alternative AI models, stacks, or additional enhancements as desired.
- The detection should be robust, i.e., handle explicit mentions of scriptures, scripture finding/quoting, implicit mentions (e.g., "Next Verse"), etc., just as in a sermon.

### Resources
#### Design Specification:
Review the design guidelines at [Figma Design](https://www.figma.com/design/8ebbsZw1iDQVUKsCOxWgZV/Full-Stack-Dev-Test?node-id=0-1). You can implement the **web or the app design** (up to you).

#### Bible Translations Database:
You can extract a **Bible database** from GitHub and format it into your own schema.

**Available Translations:**
ASV, AKJV, BRG, EHV, ESV, ESVUK, GNV, GW, ISV, JUB, KJV, KJ21, LEB, MEV, NASB, NASB1995, NET, NIV, NIVUK, NKJV, NLT, NLV, NMB*, NOG, NRSV, NRSVUE, WEB, YLT, RVA*.

> *NMB and RVA translations are not fully available on Bible Gateway yet.*

---

## Folder Structure
```
bible-quotes-app/
├── backend/                     # Node.js/Express backend
│   ├── config/
│   │   ├── database.ts
│   │   └── config.ts
│   ├── api/
│   │   ├── transcribe.ts
│   │   ├── process-text.ts
│   │   └── get-verse.ts
│   └── database/
│       └── bible.sql
├── public/                       # Static assets (images, icons)
│   ├── icons/
│   ├── logo.png
│   └── favicon.ico
├── src/
│   ├── components/               # UI components
│   │   ├── AudioRecorder.tsx
│   │   ├── TranscriptDisplay.tsx
│   │   ├── BibleVerseCard.tsx
│   │   └── Header.astro
│   ├── layouts/                  # Layouts for pages
│   │   └── Layout.astro
│   ├── pages/                     # Astro pages
│   │   └── index.astro
│   ├── styles/                    # Global styles
│   │   └── global.css
│   ├── utils/                     # Helper functions
│   │   ├── api.ts
│   │   ├── format.ts
│   ├── hooks/                     # Custom React hooks
│   │   ├── useAudioRecorder.ts
│   │   ├── useBibleVerse.ts
│   ├── context/                   # React Context API (optional)
│   │   ├── TranscriptionContext.tsx
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Setup Instructions
### 1. Create Astro Project
```sh
npm create astro@latest bible-quotes-app
```

### 2. Install Tailwind CSS
```sh
npm install -D tailwindcss @astro/tailwind
```

### 3. Install React for Interactivity
```sh
npm install @astrojs/react react react-dom
```

### 4. Install Backend Dependencies (Node.js/Express)
```sh
cd backend
npm init -y
npm install express cors dotenv multer openai axios sqlite3
```

---

## Running the Project
### Start the Frontend (Astro + React)
```sh
npm run dev
```

### Start the Backend (Node.js/Express)
```sh
cd backend
node server.js
```

---

## Features
- 🎤 **Live Audio Transcription** with OpenAI Whisper
- 📖 **AI-powered Bible Verse Detection** using Google Gemini
- ⚡ **Real-time Verse Display**
- 🌍 **Multi-Translation Support** from Bible Gateway Database
- 🛠 **Customizable & Extensible Backend**

---

## Contribution
Feel free to submit issues or pull requests. Happy coding! 🚀
