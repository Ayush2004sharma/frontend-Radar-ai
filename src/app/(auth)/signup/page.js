"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthAPI } from "@/src/lib/api";
import { useRadar } from "@/src/context/RadarContext";
import { Loader2, UserPlus } from "lucide-react";

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
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-xl">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600/10 text-blue-500">
            <UserPlus size={18} />
          </div>
          <h2 className="text-2xl font-bold text-white">Create an account</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Start using RADAR-AI in seconds
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-400">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-zinc-800 bg-black px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-zinc-400">
              Password
            </label>
            <input
              type="password"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-zinc-800 bg-black px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-60"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Creating account…" : "Sign up"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-zinc-500">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-blue-400 hover:text-blue-300"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
