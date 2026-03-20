# 🤖 AI Cover Letter Maker

A full-stack web application that generates tailored, professional cover letters in seconds. By analyzing a user's PDF resume and a specific job description, the app uses the **Gemini 3 Flash** model to create a personalized application.

## ✨ Features
- **PDF Parsing**: Automatically extracts text from uploaded resumes.
- **AI-Powered**: Uses Google's Gemini 3 Flash for high-quality, contextual writing.
- **Modern UI**: Built with React, Tailwind CSS, and Framer-like glassmorphism effects.
- **Secure Handling**: Resumes are processed in-memory (Buffer) and not stored on the server.

## 🚀 Tech Stack
### Frontend
- **React.js**
- **Tailwind CSS** (Styling)
- **Lucide React** (Icons)
- **Axios** (API Requests)

### Backend
- **Node.js & Express**
- **Multer** (File handling)
- **pdf-parse** (Text extraction)
- **@google/generative-ai** (Gemini SDK)

## 🛠️ Setup Instructions

### Prerequisites
- Node.js installed
- A Google AI Studio API Key (https://aistudio.google.com/)

### 1. Backend Setup
1. Navigate to the server directory.
2. Create a `.env` file:
   ```env
   GEMINI_API_KEY=your_api_key_here
   PORT=5000


## Live Link

-Live Link:[https://ai-cover-letter-maker-z3r1.vercel.app/]

## Screenshot
![AI Cover Letter Maker]([client\src\assets\screenshot.png](https://github.com/Charumehra/AI_COVER_LETTER_MAKER/tree/9ada88615f89e41288375b9326e96064700a33cf/client/src/assets))
