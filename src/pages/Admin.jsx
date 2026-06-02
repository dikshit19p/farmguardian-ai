import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Layout from "../components/Layout";

export default function Admin() {
  const [users, setUsers] = useState(0);
  const [farms, setFarms] = useState(0);
  const [crops, setCrops] = useState(0);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const { count: farmCount } = await supabase
      .from("farms")
      .select("*", { count: "exact", head: true });

    const { count: cropCount } = await supabase
      .from("crops")
      .select("*", { count: "exact", head: true });

    const { count: userCount } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true });

    setUsers(userCount || 0);
    setFarms(farmCount || 0);
    setCrops(cropCount || 0);
  }

  return (
    <Layout>
      <div>
        {/* Hero */}
        <div
          style={{
            background:
              "linear-gradient(135deg,#14532d,#16a34a)",
            color: "white",
            padding: "30px",
            borderRadius: "20px",
            marginBottom: "25px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "42px",
            }}
          >
            👨‍💼 Admin Dashboard
          </h1>

          <p
            style={{
              marginTop: "10px",
              opacity: 0.9,
            }}
          >
            Monitor users, farms, crops and
            overall system activity.
          </p>
        </div>

        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(250px,1fr))",
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
            <h3>👥 Total Users</h3>

            <h1
              style={{
                color: "#16a34a",
              }}
            >
              {users}
            </h1>
          </div>

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "18px",
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.08)",
              }}
          >
            <h3>🚜 Total Farms</h3>

            <h1
              style={{
                color: "#16a34a",
              }}
            >
              {farms}
            </h1>
          </div>

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "18px",
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.08)",
              }}
          >
            <h3>🌱 Total Crops</h3>

            <h1
              style={{
                color: "#16a34a",
              }}
            >
              {crops}
            </h1>
          </div>

          <div
            style={{
              background: "white",
              padding: "25px",
              borderRadius: "18px",
              boxShadow:
                "0 4px 15px rgba(0,0,0,0.08)",
              }}
          >
            <h3>🟢 System Status</h3>

            <h1
              style={{
                color: "#16a34a",
              }}
            >
              Online
            </h1>
          </div>
        </div>

        {/* Admin Insights */}
        <div
          style={{
            marginTop: "30px",
            background: "white",
            padding: "25px",
            borderRadius: "18px",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h2>📊 Platform Insights</h2>

          <p>
            👥 Registered Users: {users}
          </p>

          <p>
            🚜 Farms Managed: {farms}
          </p>

          <p>
            🌱 Crops Tracked: {crops}
          </p>

          <p>
            🤖 AI Services Active
          </p>
        </div>
      </div>
    </Layout>
  );
}
