"use client";

import { useState } from "react";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const examples = [
    "Machine Learning",
    "Blockchain",
    "Photosynthesis",
    "Cloud Computing",
  ];

  const handleExplain = async () => {
    if (!topic.trim()) {
      alert("Please enter a topic");
      return;
    }

    setLoading(true);
    setExplanation("");

    const res = await fetch("/api/explain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic }),
    });

    const data = await res.json();
    setExplanation(data.explanation);
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">

      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-2xl p-10 max-w-xl w-full text-center">

        <h1 className="text-4xl font-bold text-white mb-2">
          AI Topic Explainer
        </h1>

        <p className="text-white mb-6">
          Enter any study topic and get a simple AI explanation
        </p>

        {/* Input */}
        <input
          type="text"
          placeholder="Example: Machine Learning"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-3 rounded-lg border-none outline-none text-gray-800"
        />

        {/* Example Topic Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {examples.map((item) => (
            <button
              key={item}
              onClick={() => setTopic(item)}
              className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-200"
            >
              {item}
            </button>
          ))}
        </div>

        {/* Explain Button */}
        <button
          onClick={handleExplain}
          className="mt-5 w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300"
        >
          Explain Topic
        </button>

        {/* Loading */}
        {loading && (
          <p className="mt-4 text-white animate-pulse">
            Generating explanation...
          </p>
        )}

        {/* Explanation */}
        {explanation && (
          <div className="mt-6 bg-white rounded-lg p-5 text-left shadow-md">
            <h2 className="font-semibold mb-2 text-lg">Explanation</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {explanation}
            </p>

            <button
              onClick={() => {
                setExplanation("");
                setTopic("");
              }}
              className="mt-3 text-sm text-blue-600 hover:underline"
            >
              Clear
            </button>
          </div>
        )}

      </div>

    </main>
  );
}