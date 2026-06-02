import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Farms() {
  const [farms, setFarms] = useState([]);

  const [farmName, setFarmName] = useState("");
  const [area, setArea] = useState("");
  const [soilType, setSoilType] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetchFarms();
  }, []);

  async function fetchFarms() {
    const { data, error } = await supabase
      .from("farms")
      .select("*")
      .order("id", { ascending: false });

    if (!error) {
      setFarms(data);
    }
  }

  async function addFarm() {
    if (!farmName) {
      alert("Enter Farm Name");
      return;
    }

    const { error } = await supabase
      .from("farms")
      .insert([
        {
          farm_name: farmName,
          area,
          soil_type: soilType,
          location,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    setFarmName("");
    setArea("");
    setSoilType("");
    setLocation("");

    fetchFarms();
  }

  async function deleteFarm(id) {
    await supabase
      .from("farms")
      .delete()
      .eq("id", id);

    fetchFarms();
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
          <h1>🚜 Farm Management</h1>

          <p>
            Manage all your farms from one place.
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            marginBottom: "25px",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Total Farms</h3>
          <h1>{farms.length}</h1>
        </div>

        {/* Add Farm Form */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "16px",
            marginBottom: "30px",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h2>Add New Farm</h2>

          <div
            style={{
              display: "grid",
              gap: "12px",
            }}
          >
            <input
              placeholder="Farm Name"
              value={farmName}
              onChange={(e) =>
                setFarmName(e.target.value)
              }
              style={inputStyle}
            />

            <input
              placeholder="Area"
              value={area}
              onChange={(e) =>
                setArea(e.target.value)
              }
              style={inputStyle}
            />

            <input
              placeholder="Soil Type"
              value={soilType}
              onChange={(e) =>
                setSoilType(e.target.value)
              }
              style={inputStyle}
            />

            <input
              placeholder="Location"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              style={inputStyle}
            />

            <button
              onClick={addFarm}
              style={buttonStyle}
            >
              ➕ Add Farm
            </button>
          </div>
        </div>

        {/* Farms Grid */}
        <h2>🌾 My Farms</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "20px",
          }}
        >
          {farms.map((farm) => (
            <div
              key={farm.id}
              style={{
                background: "white",
                borderRadius: "18px",
                padding: "20px",
                boxShadow:
                  "0 4px 15px rgba(0,0,0,0.08)",
              }}
            >
              <h2>{farm.farm_name}</h2>

              <p>
                📏 Area: {farm.area}
              </p>

              <p>
                🌱 Soil: {farm.soil_type}
              </p>

              <p>
                📍 Location: {farm.location}
              </p>

              <button
                onClick={() =>
                  deleteFarm(farm.id)
                }
                style={{
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ddd",
};

const buttonStyle = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};