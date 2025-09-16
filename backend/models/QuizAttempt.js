const mongoose = require("mongoose");

const quizAttemptSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "easy" },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctIndex: { type: Number, required: true },
  userAnswerIndex: { type: Number, required: true },
  correct: { type: Boolean, required: true },
  explanation: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);
