"use client";

export default function ProblemStatementCard({
  incidentId,
  problemStatement,
  logCount,
}) {
  if (!problemStatement) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-zinc-400">
        No diagnosis available for this incident.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">
          🧠 AI Problem Statement
        </h2>

        <span
          className={`text-xs px-2 py-1 rounded ${
            logCount > 0
              ? "bg-green-600 text-white"
              : "bg-yellow-600 text-black"
          }`}
        >
          {logCount > 0
            ? `${logCount} logs analyzed`
            : "Insufficient logs"}
        </span>
      </div>

      {/* Incident ID */}
      <div className="text-xs text-zinc-500">
        Incident ID: <span className="text-zinc-400">{incidentId}</span>
      </div>

      {/* Problem Statement Body */}
      <div className="prose prose-invert max-w-none text-sm leading-relaxed whitespace-pre-line">
        {problemStatement}
      </div>

      {/* Low confidence warning */}
      {logCount === 0 && (
        <div className="rounded-md border border-yellow-600 bg-yellow-900/20 p-3 text-xs text-yellow-300">
          ⚠️ The diagnosis is based on limited information.  
          Consider checking related logs or retrying after more data is available.
        </div>
      )}
    </div>
  );
}
