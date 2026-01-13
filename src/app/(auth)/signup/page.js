"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthAPI } from "@/src/lib/api";
import { useRadar } from "@/src/context/RadarContext";

export default function SignupPage() {
  const router = useRouter();
  const { dispatch } = useRadar();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await AuthAPI.signup(email, password);
      const res = await AuthAPI.login(email, password);

      localStorage.setItem("radar_token", res.token);
      dispatch({ type: "SET_TOKEN", payload: res.token });

      router.push("/projects");
    } catch {
      setError("Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm border border-white p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button disabled={loading}>{loading ? "Creating..." : "Signup"}</button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}
