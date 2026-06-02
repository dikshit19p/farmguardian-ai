import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAdmin();
  }, []);

  async function checkAdmin() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (
        user?.user_metadata?.role === "admin"
      ) {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return children;
}
