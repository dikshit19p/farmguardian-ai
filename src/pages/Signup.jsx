import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [role, setRole] = useState("farmer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
        },
      },
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Signup Successful!");
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#0f172a,#14532d,#166534)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "450px",
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(15px)",
          borderRadius: "24px",
          padding: "40px",
          color: "white",
          boxShadow:
            "0 10px 40px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "42px",
            }}
          >
            🌾 FarmGuardian AI
          </h1>

          <p
            style={{
              opacity: 0.8,
              marginTop: "10px",
            }}
          >
            Smart Agriculture Management Platform
          </p>
        </div>

        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          Create Account 🚀
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={inputStyle}
        />

        <select
          value={role}
          onChange={(e) =>
            setRole(e.target.value)
          }
          style={inputStyle}
        >
          <option value="farmer">
            👨‍🌾 Farmer
          </option>
          <option value="admin">
            👨‍💼 Admin
          </option>
        </select>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={inputStyle}
        />

        <button
          onClick={handleSignup}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "none",
            background: "#22c55e",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Create Account
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              color: "#86efac",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>
        </p>

        <div
          style={{
            marginTop: "25px",
            textAlign: "center",
            fontSize: "13px",
            opacity: 0.8,
          }}
        >
          🌍 Supporting SDG 2 - Zero Hunger
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  marginBottom: "15px",
  borderRadius: "12px",
  border: "none",
  outline: "none",
  fontSize: "15px",
};