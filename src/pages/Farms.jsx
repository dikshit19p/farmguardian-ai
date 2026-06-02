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
      <h1>🌾 Farm Management</h1>

      <div
        style={{
          marginTop: "20px",
          display: "grid",
          gap: "10px",
          maxWidth: "500px",
        }}
      >
        <input
          placeholder="Farm Name"
          value={farmName}
          onChange={(e) =>
            setFarmName(e.target.value)
          }
        />

        <input
          placeholder="Area"
          value={area}
          onChange={(e) =>
            setArea(e.target.value)
          }
        />

        <input
          placeholder="Soil Type"
          value={soilType}
          onChange={(e) =>
            setSoilType(e.target.value)
          }
        />

        <input
          placeholder="Location"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
        />

        <button onClick={addFarm}>
          Add Farm
        </button>
      </div>

      <hr
        style={{
          marginTop: "30px",
          marginBottom: "30px",
        }}
      />

      <h2>My Farms</h2>

      {farms.map((farm) => (
        <div
          key={farm.id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{farm.farm_name}</h3>

          <p>Area: {farm.area}</p>

          <p>Soil: {farm.soil_type}</p>

          <p>Location: {farm.location}</p>

          <button
            onClick={() =>
              deleteFarm(farm.id)
            }
          >
            Delete
          </button>
        </div>
      ))}
    </Layout>
  );
}