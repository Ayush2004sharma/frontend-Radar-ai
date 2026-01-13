"use client"

import { useEffect, useState } from "react"
import { useRadar } from "@/src/context/RadarContext"

export default function PriorityIncidentList({ onSelect }) {
  const { state, dispatch } = useRadar()
  const { token, project, incident } = state

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token || !project) return

    setLoading(true)
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/incidents/priority?project_id=${project.id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((res) => res.json())
      .then(setData)
      .catch(() => setError("Failed to load incidents"))
      .finally(() => setLoading(false))
  }, [token, project])

  if (loading) return <p className="text-zinc-400 text-sm">Loading incidents…</p>
  if (error) return <p className="text-red-500 text-sm">{error}</p>
  if (!data) return null

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold text-zinc-300">
        Which incident should be solved?
      </h2>

      {data.prioritized_incidents.map((i) => {
        const active = incident?.id === i.incident_id

        return (
          <button
            key={i.incident_id}
            onClick={() => {
              dispatch({
                type: "SET_INCIDENT",
                payload: {
                  id: i.incident_id,
                  priority_score: i.priority_score,
                  reason: i.reason,
                },
              })
              onSelect?.() // ✅ close mobile drawer
            }}
            className={`w-full rounded-lg border p-3 text-left text-sm ${
              active
                ? "border-green-600 bg-zinc-800"
                : "border-zinc-700 hover:bg-zinc-800"
            }`}
          >
            <div className="flex justify-between gap-2">
              <span className="font-medium truncate">
                Incident {i.incident_id.slice(-6)}
              </span>
              <span className="text-xs text-zinc-400">
                {i.priority_score}
              </span>
            </div>

            <p className="mt-1 text-xs text-zinc-400 line-clamp-2">
              {i.reason}
            </p>
          </button>
        )
      })}
    </div>
  )
}
