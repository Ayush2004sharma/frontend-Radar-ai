"use client";

import { useState } from "react";
import { DiagnoseAPI } from "@/src/lib/api";
import { useRadar } from "@/src/context/RadarContext";
import ProblemStatementCard from "./ProblemStatementCard";

export default function DiagnoseIncident() {
  const { state } = useRadar();
  const { token, project, incident } = state; // 🔥 use incident from context

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [diagnosis, setDiagnosis] = useState(null);

  async function handleDiagnose() {
    if (!token || !project || !incident) {
      setError("Select an incident first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await DiagnoseAPI.diagnoseIncident(
        project.id,
        incident.id,   // 🔥 correct incident source
        token
      );

      setDiagnosis(res);
    } catch (err) {
      setError("Failed to diagnose incident");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {!diagnosis && (
        <button
          onClick={handleDiagnose}
          disabled={loading || !incident}
          className="rounded bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-60"
        >
          {loading ? "Analyzing logs..." : "🧠 Diagnose Incident"}
        </button>
      )}

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {diagnosis && (
        <ProblemStatementCard
          incidentId={diagnosis.incident_id}
          problemStatement={diagnosis.problem_statement}
          logCount={diagnosis.log_count}
        />
      )}
    </div>
  );
}
