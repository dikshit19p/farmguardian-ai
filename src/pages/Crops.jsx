import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Layout from "../components/Layout";

export default function Crops() {
  const [cropName, setCropName] = useState("");
  const [farmId, setFarmId] = useState("");
  const [sowingDate, setSowingDate] = useState("");
  const [harvestDate, setHarvestDate] = useState("");
  const [healthStatus, setHealthStatus] = useState("");

  const [crops, setCrops] = useState([]);

  useEffect(() => {
    fetchCrops();
  }, []);

  async function fetchCrops() {
    const { data } = await supabase
      .from("crops")
      .select("*")
      .order("id", { ascending: false });

    setCrops(data || []);
  }

  async function addCrop() {
    if (!cropName || !farmId) {
      alert("Please fill required fields");
      return;
    }

    const { error } = await supabase
      .from("crops")
      .insert([
        {
          farm_id: farmId,
          crop_name: cropName,
          sowing_date: sowingDate,
          harvest_date: harvestDate,
          health_status: healthStatus,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    setCropName("");
    setFarmId("");
    setSowingDate("");
    setHarvestDate("");
    setHealthStatus("");

    fetchCrops();
  }

  async function deleteCrop(id) {
    await supabase
      .from("crops")
      .delete()
      .eq("id", id);

    fetchCrops();
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
            🌱 Crop Management
          </h1>

          <p
            style={{
              marginTop: "10px",
              opacity: 0.9,
            }}
          >
            Track, monitor and manage crop
            information efficiently.
          </p>
        </div>

        {/* Form */}
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "20px",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)",
            marginBottom: "25px",
          }}
        >
          <h2>➕ Add New Crop</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(250px,1fr))",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            <input
              placeholder="🚜 Farm ID"
              value={farmId}
              onChange={(e) =>
                setFarmId(e.target.value)
              }
              style={inputStyle}
            />

            <input
              placeholder="🌾 Crop Name"
              value={cropName}
              onChange={(e) =>
                setCropName(e.target.value)
              }
              style={inputStyle}
            />

            <input
              type="date"
              value={sowingDate}
              onChange={(e) =>
                setSowingDate(e.target.value)
              }
              style={inputStyle}
            />

            <input
              type="date"
              value={harvestDate}
              onChange={(e) =>
                setHarvestDate(e.target.value)
              }
              style={inputStyle}
            />

            <input
              placeholder="💚 Health Status"
              value={healthStatus}
              onChange={(e) =>
                setHealthStatus(
                  e.target.value
                )
              }
              style={inputStyle}
            />
          </div>

          <button
            onClick={addCrop}
            style={{
              marginTop: "20px",
              background: "#16a34a",
              color: "white",
              border: "none",
              padding: "14px 25px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ➕ Add Crop
          </button>
        </div>

        {/* Crop Count */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "15px",
            marginBottom: "20px",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h2>
            🌱 Total Crops: {crops.length}
          </h2>
        </div>

        {/* Crop Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "20px",
          }}
        >
          {crops.map((crop) => (
            <div
              key={crop.id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "18px",
                boxShadow:
                  "0 4px 15px rgba(0,0,0,0.08)",
              }}
            >
              <h2>{crop.crop_name}</h2>

              <p>
                🚜 Farm ID: {crop.farm_id}
              </p>

              <p>
                🌱 Health:
                <span
                  style={{
                    marginLeft: "8px",
                    color: "#16a34a",
                    fontWeight: "bold",
                  }}
                >
                  {crop.health_status}
                </span>
              </p>

              <p>
                📅 Sowing:
                {" "}
                {crop.sowing_date}
              </p>

              <p>
                🌾 Harvest:
                {" "}
                {crop.harvest_date}
              </p>

              <button
                onClick={() =>
                  deleteCrop(crop.id)
                }
                style={{
                  marginTop: "10px",
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                🗑 Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

const inputStyle = {
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #ddd",
  fontSize: "15px",
};