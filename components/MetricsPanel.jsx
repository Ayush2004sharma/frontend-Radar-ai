"use client"
import { useEffect, useState } from "react"
import { connectMetrics } from "../lib/socket"

export default function MetricsPanel() {
  const [metrics, setMetrics] = useState({})

  useEffect(() => {
    const ws = connectMetrics(setMetrics)
    return () => ws.close()
  }, [])

  return (
    <section className="border border-neutral-800 rounded-lg p-4 bg-neutral-950">
      <h2 className="text-xl font-semibold mb-3 text-neutral-100">
        Live Error Metrics
      </h2>

      {Object.keys(metrics).length === 0 && (
        <p className="text-neutral-500 italic">
          Waiting for metrics…
        </p>
      )}

      {Object.keys(metrics).length > 0 && (
        <div className="space-y-1">
          {Object.entries(metrics).map(([service, count]) => (
            <div
              key={service}
              className="
                flex justify-between
                font-mono text-sm
                bg-black
                border border-neutral-800
                rounded
                px-3 py-2
                text-neutral-200
              "
            >
              <span>{service}</span>
              <span>{count}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
