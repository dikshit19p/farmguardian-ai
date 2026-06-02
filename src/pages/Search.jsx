import { useState } from "react";
import { supabase } from "../lib/supabase";
import Layout from "../components/Layout";

export default function Search() {
  const [query, setQuery] = useState("");
  const [farms, setFarms] = useState([]);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    if (!query.trim()) return;

    setLoading(true);

    const { data: farmData } = await supabase
      .from("farms")
      .select("*")
      .ilike("farm_name", `%${query}%`);

    const { data: cropData } = await supabase
      .from("crops")
      .select("*")
      .ilike("crop_name", `%${query}%`);

    setFarms(farmData || []);
    setCrops(cropData || []);

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
            🔍 Smart Search
          </h1>

          <p
            style={{
              marginTop: "10px",
              opacity: 0.9,
            }}
          >
            Search farms and crops instantly.
          </p>
        </div>

        {/* Search Box */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "20px",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)",
            marginBottom: "25px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <input
              placeholder="Search farm name or crop name..."
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }
              style={{
                flex: 1,
                padding: "15px",
                borderRadius: "12px",
                border: "1px solid #ddd",
                fontSize: "15px",
              }}
            />

            <button
              onClick={handleSearch}
              style={{
                background: "#16a34a",
                color: "white",
                border: "none",
                padding: "15px 25px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Search
            </button>
          </div>
        </div>

        {/* Stats */}
        {(farms.length > 0 || crops.length > 0) && (
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginBottom: "25px",
            }}
          >
            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "15px",
                flex: 1,
                boxShadow:
                  "0 4px 15px rgba(0,0,0,0.08)",
              }}
            >
              <h3>🚜 Farms Found</h3>
              <h1>{farms.length}</h1>
            </div>

            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "15px",
                flex: 1,
                boxShadow:
                  "0 4px 15px rgba(0,0,0,0.08)",
              }}
            >
              <h3>🌱 Crops Found</h3>
              <h1>{crops.length}</h1>
            </div>
          </div>
        )}

        {loading && (
          <h3>🔄 Searching...</h3>
        )}

        {/* Farm Results */}
        {farms.length > 0 && (
          <>
            <h2>🚜 Farm Results</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(300px,1fr))",
                gap: "20px",
                marginBottom: "30px",
              }}
            >
              {farms.map((farm) => (
                <div
                  key={farm.id}
                  style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "18px",
                    boxShadow:
                      "0 4px 15px rgba(0,0,0,0.08)",
                  }}
                >
                  <h2>{farm.farm_name}</h2>

                  <p>
                    📍 {farm.location}
                  </p>

                  <p>
                    🌱 {farm.soil_type}
                  </p>

                  <p>
                    📏 {farm.area}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Crop Results */}
        {crops.length > 0 && (
          <>
            <h2>🌾 Crop Results</h2>

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
                    🏥 Health:{" "}
                    {crop.health_status}
                  </p>

                  <p>
                    🚜 Farm ID:{" "}
                    {crop.farm_id}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {!loading &&
          query &&
          farms.length === 0 &&
          crops.length === 0 && (
            <div
              style={{
                background: "white",
                padding: "40px",
                borderRadius: "20px",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              <h2>😕 No Results Found</h2>

              <p>
                Try searching another farm
                or crop name.
              </p>
            </div>
          )}
      </div>
    </Layout>
  );
}