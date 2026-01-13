"use client"

import { useEffect, useState } from "react"
import { IncidentAPI } from "@/src/lib/api"
import { useRadar } from "@/src/context/RadarContext"

export default function FileList({ onSelect }) {
  const { state, dispatch } = useRadar()
  const { token, project, incident } = state

  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token || !project || !incident) return

    setLoading(true)
    IncidentAPI.prioritizedFiles(incident.id, project.id, token)
      .then((res) => setFiles(res.files || []))
      .catch(() => setError("Failed to load files"))
      .finally(() => setLoading(false))
  }, [token, project, incident])

  if (!incident) {
    return (
      <p className="text-zinc-400 text-sm">
        Select an incident to see related files
      </p>
    )
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-zinc-300">
        Affected Files
      </h3>

      {loading && <p className="text-zinc-400 text-sm">Loading…</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {files.map((file) => (
        <button
          key={file.path}
          onClick={() => {
            dispatch({
              type: "SET_FILE_PATH", // ✅ FIXED
              payload: file.path,
            })
            onSelect?.() // ✅ close drawer
          }}
          className="w-full rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-left hover:bg-zinc-800"
        >
          <div className="flex justify-between gap-2">
            <span className="font-mono text-xs truncate">
              {file.path}
            </span>
            <span className="text-xs text-green-400">
              {file.score}
            </span>
          </div>

          <div className="mt-1 text-[11px] text-zinc-400">
            size: {file.size} bytes
          </div>
        </button>
      ))}
    </div>
  )
}
