import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      alert(error.message);
      return;
    }

    const role =
      data.user.user_metadata.role;

    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
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
          width: "420px",
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
          Welcome Back 👋
        </h2>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "15px",
            borderRadius: "12px",
            border: "none",
            outline: "none",
            fontSize: "15px",
          }}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          style={{
            width: "100%",
            padding: "14px",
            marginBottom: "20px",
            borderRadius: "12px",
            border: "none",
            outline: "none",
            fontSize: "15px",
          }}
        />

        <button
          onClick={handleLogin}
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
          Login
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            style={{
              color: "#86efac",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}