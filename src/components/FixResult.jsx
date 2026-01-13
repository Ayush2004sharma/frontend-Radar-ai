"use client";

export default function FixResult({ fixed, explanation }) {
  if (!fixed) {
    return (
      <div className="rounded border border-zinc-800 bg-zinc-950 p-4 text-zinc-500">
        No fix yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Explanation */}
      <div className="rounded border border-purple-800 bg-purple-950 p-4">
        <h3 className="mb-1 font-semibold text-purple-300">
          Why this fix was suggested
        </h3>
        <p className="text-sm text-purple-200">{explanation}</p>
      </div>

      {/* Fixed Code */}
      <div className="rounded border border-green-800 bg-green-950 p-4">
        <div className="mb-2 text-sm text-green-400">
          AI Suggested Fix
        </div>

        <pre className="overflow-x-auto text-sm text-green-300">
          {fixed}
        </pre>
      </div>
    </div>
  );
}
