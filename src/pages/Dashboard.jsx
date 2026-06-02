import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const navigate = useNavigate();

  const [farmCount, setFarmCount] = useState(0);
  const [cropCount, setCropCount] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    const { count: farms } = await supabase
      .from("farms")
      .select("*", { count: "exact", head: true });

    const { count: crops } = await supabase
      .from("crops")
      .select("*", { count: "exact", head: true });

    setFarmCount(farms || 0);
    setCropCount(crops || 0);
  }

  const quickActions = [
    {
      title: "➕ Add Farm",
      description: "Manage farm records",
      path: "/farms",
    },
    {
      title: "🌱 Add Crop",
      description: "Track crop details",
      path: "/crops",
    },
    {
      title: "🤖 AI Assistant",
      description: "Ask farming questions",
      path: "/ai-assistant",
    },
    {
      title: "🌾 Crop Recommendation",
      description: "Get AI crop suggestions",
      path: "/crop-recommendation",
    },
    {
      title: "🔍 Smart Search",
      description: "Search farms & crops",
      path: "/search",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f7f4",
        padding: "30px",
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#14532d,#16a34a)",
          color: "white",
          borderRadius: "20px",
          padding: "35px",
          marginBottom: "30px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "10px",
          }}
        >
          🌾 FarmGuardian AI
        </h1>

        <p
          style={{
            fontSize: "18px",
            opacity: 0.95,
          }}
        >
          Smart Agriculture Management Platform
        </p>

        <p>
          Manage farms, crops and AI-powered
          agricultural insights from one place.
        </p>
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "35px",
        }}
      >
        <div
          style={cardStyle}
        >
          <h3>🚜 Total Farms</h3>
          <h1>{farmCount}</h1>
        </div>

        <div
          style={cardStyle}
        >
          <h3>🌱 Total Crops</h3>
          <h1>{cropCount}</h1>
        </div>

        <div
          style={cardStyle}
        >
          <h3>🤖 AI Assistant</h3>
          <h1>Active</h1>
        </div>

        <div
          style={cardStyle}
        >
          <h3>🟢 Status</h3>
          <h1>Online</h1>
        </div>
      </div>

      {/* Quick Actions */}
      <h2
        style={{
          marginBottom: "15px",
        }}
      >
        ⚡ Quick Actions
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(240px,1fr))",
          gap: "20px",
          marginBottom: "35px",
        }}
      >
        {quickActions.map((item) => (
          <div
            key={item.title}
            onClick={() =>
              navigate(item.path)
            }
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "18px",
              cursor: "pointer",
              transition: "0.3s",
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.08)",
            }}
          >
            <h3>{item.title}</h3>

            <p
              style={{
                color: "#666",
              }}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>

      {/* Insights */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "2fr 1fr",
          gap: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "18px",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h2>🌾 Recent Activity</h2>

          <p>
            🚜 Farm records managed
            successfully.
          </p>

          <p>
            🌱 Crop data tracked and
            updated.
          </p>

          <p>
            🤖 AI recommendations available.
          </p>

          <p>
            🔍 Smart Search ready for use.
          </p>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,#22c55e,#15803d)",
            color: "white",
            padding: "25px",
            borderRadius: "18px",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h2>🤖 AI Insight</h2>

          <p>
            Rice cultivation performs
            best in loamy soil during
            monsoon season.
          </p>

          <p>
            Maintain proper irrigation
            and monitor nitrogen levels
            regularly.
          </p>
        </div>
      </div>

      {/* SDG Section */}
      <div
        style={{
          marginTop: "35px",
          background: "white",
          padding: "25px",
          borderRadius: "18px",
          boxShadow:
            "0 4px 15px rgba(0,0,0,0.08)",
        }}
      >
        <h2>
          🌍 Sustainable Development Goals
        </h2>

        <p>
          🎯 SDG 2 - Zero Hunger
        </p>

        <p>
          🏗 SDG 9 - Industry,
          Innovation & Infrastructure
        </p>

        <p>
          🌱 SDG 15 - Life on Land
        </p>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  borderRadius: "18px",
  padding: "25px",
  boxShadow:
    "0 4px 15px rgba(0,0,0,0.08)",
};