import { useState } from "react";

const sampleQuiz = {
  course: "React for Beginners",
  questions: [
    {
      id: 1,
      question: "What is React primarily used for?",
      options: ["Database Management", "Building User Interfaces", "Server Hosting", "File Storage"],
      answer: "Building User Interfaces",
    },
    {
      id: 2,
      question: "Which hook is used for state management?",
      options: ["useEffect", "useState", "useContext", "useReducer"],
      answer: "useState",
    },
    {
      id: 3,
      question: "What does JSX stand for?",
      options: ["JavaScript XML", "Java Syntax Extension", "JSON X-Format", "JavaScript Execution"],
      answer: "JavaScript XML",
    },
  ],
};

export default function Quiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qid, option) => {
    setAnswers({ ...answers, [qid]: option });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const score = submitted
    ? sampleQuiz.questions.filter((q) => answers[q.id] === q.answer).length
    : 0;

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{sampleQuiz.course} - Quiz</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {sampleQuiz.questions.map((q) => (
          <div key={q.id} className="bg-white shadow p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-3">{q.question}</h2>
            <div className="space-y-2">
              {q.options.map((opt, index) => (
                <label key={index} className="block">
                  <input
                    type="radio"
                    name={`q-${q.id}`}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={() => handleSelect(q.id, opt)}
                    className="mr-2"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}

        {!submitted ? (
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Quiz
          </button>
        ) : (
          <div className="text-center mt-6">
            <h2 className="text-2xl font-bold text-green-600">
              You scored {score} / {sampleQuiz.questions.length}
            </h2>
          </div>
        )}
      </form>
    </div>
  );
}
