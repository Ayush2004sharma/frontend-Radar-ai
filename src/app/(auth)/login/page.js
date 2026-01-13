"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthAPI } from "@/src/lib/api";
import { useRadar } from "@/src/context/RadarContext";

export default function LoginPage() {
  const router = useRouter();
  const { state, dispatch } = useRadar();
  const { token } = state;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) router.replace("/projects");
  }, [token, router]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await AuthAPI.login(email, password);
      localStorage.setItem("radar_token", res.token);
      dispatch({ type: "SET_TOKEN", payload: res.token });
      router.push("/projects");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm border border-white p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}
