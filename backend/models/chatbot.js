const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const QuizAttempt = require("../models/QuizAttempt");
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Helper: ask OpenAI to create a quiz JSON
 * Ensures consistent JSON structure for frontend parsing.
 */
async function generateQuiz({ topic = "general programming", difficulty = "easy" }) {
  const system = `
You are a quiz generator for an e-learning app. 
Return STRICT JSON with keys: question (string), options (array of 4 short strings), correctIndex (0-3), explanation (1-2 sentences).
Make the question clear, single-correct-answer, level: ${difficulty}. Topic: ${topic}.
NO markdown, NO extra keys. JSON only.
  `.trim();

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",              // keep compatible & inexpensive
    response_format: { type: "json_object" }, // asks for valid JSON
    messages: [
      { role: "system", content: system },
      { role: "user", content: `Create ONE question now.` }
    ],
    temperature: 0.7,
  });

  let json;
  try {
    json = JSON.parse(completion.choices?.[0]?.message?.content || "{}");
  } catch (e) {
    // very rare fallback (force a safe default structure)
    json = {
      question: "Which one is a JavaScript framework?",
      options: ["Django", "Laravel", "React", "Rails"],
      correctIndex: 2,
      explanation: "React is a popular JS library/framework for building UIs."
    };
  }

  // Light validation
  if (
    !json ||
    typeof json.question !== "string" ||
    !Array.isArray(json.options) ||
    json.options.length !== 4 ||
    typeof json.correctIndex !== "number" ||
    json.correctIndex < 0 ||
    json.correctIndex > 3
  ) {
    json = {
      question: "Which one is a JavaScript framework?",
      options: ["Django", "Laravel", "React", "Rails"],
      correctIndex: 2,
      explanation: "React is a popular JS library/framework for building UIs."
    };
  }

  return { ...json, topic, difficulty };
}

/** POST /api/chatbot/message
 *  Regular chat: stores user message + bot reply (OpenAI)
 *  Tip: If you want to *always* prefer quiz route for quizzes, keep this as general chat.
 */
router.post("/message", async (req, res) => {
  try {
    const { sender, text } = req.body;

    await new Message({ sender, text }).save();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a concise and helpful coding tutor." },
        { role: "user", content: text }
      ],
      temperature: 0.7
    });

    const botText = completion.choices?.[0]?.message?.content?.trim() || "Let’s learn together!";
    await new Message({ sender: "bot", text: botText }).save();

    res.json({ reply: botText });
  } catch (err) {
    console.error("message error:", err);
    res.status(500).json({ error: "Chatbot error" });
  }
});

/** POST /api/chatbot/quiz
 *  Body: { topic?: string, difficulty?: "easy"|"medium"|"hard" }
 *  Returns: { question, options[4], correctIndex, explanation, topic, difficulty }
 */
router.post("/quiz", async (req, res) => {
  try {
    const { topic = "general programming", difficulty = "easy" } = req.body || {};
    const quiz = await generateQuiz({ topic, difficulty });
    res.json(quiz);
  } catch (err) {
    console.error("quiz error:", err);
    res.status(500).json({ error: "Quiz generation failed" });
  }
});

/** POST /api/chatbot/grade
 *  Body: { topic, difficulty, question, options, correctIndex, userAnswerIndex, explanation? }
 *  Stores attempt and returns { correct: boolean, explanation, scoreDelta: 1|0 }
 */
router.post("/grade", async (req, res) => {
  try {
    const { topic, difficulty, question, options, correctIndex, userAnswerIndex, explanation } = req.body;

    const correct = Number(userAnswerIndex) === Number(correctIndex);
    await QuizAttempt.create({
      topic,
      difficulty,
      question,
      options,
      correctIndex,
      userAnswerIndex,
      correct,
      explanation
    });

    res.json({
      correct,
      explanation: explanation || (correct ? "Great job!" : "Good try — review the explanation above."),
      scoreDelta: correct ? 1 : 0
    });
  } catch (err) {
    console.error("grade error:", err);
    res.status(500).json({ error: "Grading failed" });
  }
});

module.exports = router;
