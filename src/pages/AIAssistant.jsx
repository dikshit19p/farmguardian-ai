import { useState } from "react";
import { model } from "../lib/gemini";
import Layout from "../components/Layout";

export default function AIAssistant() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function askAI() {
    if (!question.trim()) return;

    const userMessage = {
      type: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const prompt = `
You are an expert agricultural advisor.

Provide:
1. Possible causes
2. Recommended actions
3. Prevention tips

Farmer Question:
${question}
`;

      const result = await model.generateContent(prompt);

      const aiResponse = result.response.text();

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: aiResponse,
        },
      ]);

      setQuestion("");
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          text: "❌ Failed to get AI response.",
        },
      ]);
    }

    setLoading(false);
  }

  return (
    <Layout>
      <div>
        {/* Hero */}
        <div
          style={{
            background:
              "linear-gradient(135deg,#14532d,#16a34a)",
            borderRadius: "20px",
            padding: "30px",
            color: "white",
            marginBottom: "25px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "42px",
            }}
          >
            🤖 AI Farming Assistant
          </h1>

          <p
            style={{
              marginTop: "10px",
              opacity: 0.9,
            }}
          >
            Ask farming questions and get
            AI-powered agricultural guidance.
          </p>
        </div>

        {/* Chat Area */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "20px",
            minHeight: "450px",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {messages.length === 0 && (
            <div
              style={{
                textAlign: "center",
                marginTop: "100px",
                color: "#666",
              }}
            >
              <h2>🌾 Welcome Farmer</h2>

              <p>
                Ask about crop diseases,
                irrigation, soil health,
                fertilizers, pest control,
                and more.
              </p>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  msg.type === "user"
                    ? "flex-end"
                    : "flex-start",
                marginBottom: "15px",
              }}
            >
              <div
                style={{
                  maxWidth: "75%",
                  padding: "15px",
                  borderRadius: "16px",
                  whiteSpace: "pre-wrap",
                  background:
                    msg.type === "user"
                      ? "#16a34a"
                      : "#f3f4f6",
                  color:
                    msg.type === "user"
                      ? "white"
                      : "#111",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div
              style={{
                marginBottom: "15px",
              }}
            >
              🤖 Thinking...
            </div>
          )}
        </div>

        {/* Input Area */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "10px",
          }}
        >
          <textarea
            rows="3"
            placeholder="Ask about crop diseases, irrigation, fertilizers..."
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            style={{
              flex: 1,
              padding: "15px",
              borderRadius: "15px",
              border: "1px solid #ddd",
              resize: "none",
              fontSize: "15px",
            }}
          />

          <button
            onClick={askAI}
            disabled={loading}
            style={{
              background: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "15px",
              padding: "0 25px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Send 🚀
          </button>
        </div>
      </div>
    </Layout>
  );
}