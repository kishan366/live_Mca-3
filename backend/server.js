import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

let quizData = [
  { question: "What is React?", options: ["Library", "Framework", "Language"], answer: "Library" },
  { question: "What is JSX?", options: ["JavaScript XML", "Java Syntax", "JSON"], answer: "JavaScript XML" }
];

// Chat API (dummy AI)
app.post("/api/chat", (req, res) => {
  const { message } = req.body;
  res.json({ reply: `You said: ${message}` });
});

// Quiz API
app.post("/api/quiz", (req, res) => {
  res.json({ quiz: quizData });
});

// Quiz submit API
app.post("/api/quiz/submit", (req, res) => {
  const { answers } = req.body;
  let score = 0;
  quizData.forEach((q, i) => {
    if (answers[i] === q.answer) score++;
  });
  res.json({ score });
});

app.listen(5000, () => console.log("Server running on port 5000"));
