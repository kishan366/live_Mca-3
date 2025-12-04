// server.js
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // during dev only; in production secure this

// CHANGE THIS to the model you pulled in Ollama
const OLLAMA_URL = "http://localhost:11434/api/generate";
const MODEL_NAME = "llama3.2:3b"; // <-- replace if you pulled another model

// Basic validator: ensures MCQ shape
function isValidQuizArray(arr) {
  if (!Array.isArray(arr)) return false;
  return arr.every(q =>
    q &&
    typeof q.id === "string" &&
    typeof q.question === "string" &&
    Array.isArray(q.options) &&
    q.options.length >= 2 && // at least 2 options
    Number.isInteger(q.answerIndex) &&
    q.answerIndex >= 0 &&
    q.answerIndex < q.options.length
  );
}

app.post("/api/generate-quiz", async (req, res) => {
  try {
    const { topic = "General Knowledge", count = 5, difficulty = "medium", type = "mcq" } = req.body;

    // Clear, strict prompt that asks ONLY for JSON array
    const prompt = `
You are a quiz generator. Generate ${count} ${type === "mcq" ? "multiple-choice" : "short-answer"} questions about "${topic}" with difficulty "${difficulty}".
Return ONLY a JSON array. Each item must be an object:
{
  "id": "<unique string>",
  "question": "<text>",
  "options": ["opt1","opt2","opt3","opt4"],   // for MCQ only
  "answerIndex": 0,                            // integer index of correct option
  "explanation": "<optional explanation>"
}
Respond with valid JSON array and nothing else.
`.trim();

    const body = {
      model: MODEL_NAME,
      prompt,
      stream: false
      // format: "json" // optional depending on Ollama version
    };

    const r = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      timeout: 120000 // 2 min
    });

    if (!r.ok) {
      const txt = await r.text();
      return res.status(502).json({ error: "ollama_error", detail: txt });
    }

    const data = await r.json();

    // Try several common shapes to extract the JSON array
    let candidate = null;

    // 1) If response is array already
    if (Array.isArray(data)) candidate = data;

    // 2) If data.output or data.text exists
    if (!candidate) {
      // Many Ollama responses put the model text in `data.output` or `data.content`
      const text = (data.output && typeof data.output === "string" && data.output)
        || (data[0] && data[0].content && data[0].content) // possible shapes
        || (typeof data === "object" && JSON.stringify(data));
      // try extract JSON array substring
      const m = String(text).match(/\[.*\]/s);
      if (m) {
        try {
          candidate = JSON.parse(m[0]);
        } catch (e) {
          // parse failed
          candidate = null;
        }
      }
    }

    // 3) final fallback: if data is string
    if (!candidate && typeof data === "string") {
      try {
        candidate = JSON.parse(data);
      } catch (e) {
        candidate = null;
      }
    }

    if (!candidate || !isValidQuizArray(candidate)) {
      return res.status(500).json({ error: "invalid_model_output", raw: data });
    }

    // Success
    return res.json({ quiz: candidate });
  } catch (err) {
    console.error("Generate quiz error:", err);
    return res.status(500).json({ error: "server_error", detail: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Quiz API running on http://localhost:${PORT}`));
