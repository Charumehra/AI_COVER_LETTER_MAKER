require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors({
  origin:"https://ai-cover-letter-maker-z3r1.vercel.app"
}));
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/generate", upload.single("resume"), async (req, res) => {
  try {
    const { jobDescription, candidateName, companyName } = req.body;
    if (!req.file) return res.status(400).send("No file uploaded.");

    const pdfData = await pdfParse(req.file.buffer);
    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const prompt = `Write a 3-paragraph cover letter for ${candidateName} at ${companyName}. 
                        Resume Content: ${pdfData.text}. 
                        Job Details: ${jobDescription}`;

    const result = await model.generateContent(prompt);
    res.json({ coverLetter: result.response.text() });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).send("Backend failed to process.");
  }
});

app.listen(5000, () => console.log("Server ready on port 5000"));
