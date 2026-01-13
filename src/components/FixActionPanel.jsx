"use client";

import { useState } from "react";
import { IncidentAPI } from "@/src/lib/api";
import { useRadar } from "@/src/context/RadarContext"; // ✅ FIX

export default function FixActionPanel({ fixResult }) {
  const { state, dispatch } = useRadar();
  const { token, project, incident, filePath } = state;

  const [loading, setLoading] = useState(false);

  async function handleResolve(resolved) {
    setLoading(true);

    try {
      await IncidentAPI.resolveIncident(
        incident.id,
        project.id,
        filePath,
        resolved,
        token
      );

      if (resolved) {
        dispatch({ type: "SET_INCIDENT", payload: null });
        dispatch({ type: "SET_FILE_PATH", payload: null });
      }
    } finally {
      setLoading(false);
    }
  }

  if (!fixResult) return null;

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        disabled={loading}
        onClick={() => handleResolve(true)}
        className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white"
      >
        ✅ Solved
      </button>

      <button
        disabled={loading}
        onClick={() => handleResolve(false)}
        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white"
      >
        ❌ Not Solved
      </button>
    </div>
  );
}
