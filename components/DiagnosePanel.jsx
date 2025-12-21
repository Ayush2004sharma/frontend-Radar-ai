"use client"

import { diagnose, diagnoseFiles } from "../lib/api"

export default function DiagnosePanel({
  service,
  setService,
  setDiagnosis,
  setFiles,
  projectId,
  projectSecret,
  setProjectId,
  setProjectSecret,
}) {
  const run = async () => {
    if (!projectId || !projectSecret || !service) {
      setDiagnosis({
        status: "failed",
        reason: "project_id, project_secret and service are required",
      })
      return
    }

    setDiagnosis({ status: "loading" })

    const payload = {
      project_id: projectId,
      project_secret: projectSecret,
      service,
    }

    const res = await diagnose(payload)
    setDiagnosis(res)

    if (res.status === "success") {
      const f = await diagnoseFiles(payload)
      setFiles(f.files || [])
    }
  }

  return (
    <section className="border border-neutral-800 rounded-lg p-4 bg-neutral-950">
      <h2 className="text-xl font-semibold mb-3 text-neutral-100">
        Diagnose Service
      </h2>

      <div className="flex flex-col gap-2 mb-3">
        <input
          value={projectId}
          onChange={e => setProjectId(e.target.value)}
          placeholder="project_id (e.g. proj_1)"
          className="
            bg-black
            border border-neutral-700
            rounded
            px-3 py-2
            text-neutral-100
            placeholder-neutral-500
            focus:outline-none
            focus:ring-1
            focus:ring-neutral-400
          "
        />
        <input
          value={projectSecret}
          onChange={e => setProjectSecret(e.target.value)}
          placeholder="project_secret"
          className="
            bg-black
            border border-neutral-700
            rounded
            px-3 py-2
            text-neutral-100
            placeholder-neutral-500
            focus:outline-none
            focus:ring-1
            focus:ring-neutral-400
          "
        />
      </div>

      <div className="flex gap-2 items-center">
        <input
          value={service}
          onChange={e => setService(e.target.value)}
          placeholder="service-name (e.g. my-ai-ide)"
          className="
            flex-1
            bg-black
            border border-neutral-700
            rounded
            px-3 py-2
            text-neutral-100
            placeholder-neutral-500
            focus:outline-none
            focus:ring-1
            focus:ring-neutral-400
          "
        />

        <button
          onClick={run}
          className="
            px-4 py-2
            rounded
            bg-neutral-200
            text-black
            font-medium
            hover:bg-neutral-300
            transition
          "
        >
          Diagnose
        </button>
      </div>
    </section>
  )
}
