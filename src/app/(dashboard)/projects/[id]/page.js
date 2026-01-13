"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useRadar } from "@/src/context/RadarContext"
import { ProjectAPI, IncidentAPI } from "@/src/lib/api"

// Components
import PriorityIncidentList from "@/src/components/PriorityIncidentList"
import DiagnoseIncident from "@/src/components/DiagnoseIncident"
import FileList from "@/src/components/FileList"
import FileViewer from "@/src/components/FileViewer"
import FixResult from "@/src/components/FixResult"
import FixActionPanel from "@/src/components/FixActionPanel"
import ProjectCredentials from "@/src/components/ProjectCredentials"

// Icons
import {
  Settings,
  Loader2,
  Code2,
  MonitorCheck,
  Sparkles,
} from "lucide-react"

export default function ProjectPage() {
  const router = useRouter()
  const { id: projectIdFromRoute } = useParams()
  const { state, dispatch } = useRadar()
  const { token, project, incident, filePath } = state

  const [fixResult, setFixResult] = useState(null)
  const [fixLoading, setFixLoading] = useState(false)
  const [fixError, setFixError] = useState(null)

  // ✅ MOBILE LIST DRAWER STATE
  const [showLists, setShowLists] = useState(false)

  /* ---------------- AUTH GUARD ---------------- */
  useEffect(() => {
    if (!token) router.push("/login")
  }, [token, router])

  /* ---------------- PROJECT LOAD ---------------- */
  useEffect(() => {
    if (!token) return
    if (project && project.id === projectIdFromRoute) return

    ProjectAPI.listProjects(token).then((projects) => {
      const found = projects.find((p) => p.id === projectIdFromRoute)
      if (found) dispatch({ type: "SET_PROJECT", payload: found })
    })
  }, [token, projectIdFromRoute, project, dispatch])

  /* ---------------- RESET FIX WHEN FILE CHANGES ---------------- */
  useEffect(() => {
    setFixResult(null)
    setFixError(null)
  }, [filePath])

  /* ---------------- FIX HANDLER ---------------- */
  async function handleFix() {
    if (!token || !project || !incident || !filePath) return
    setFixLoading(true)
    setFixError(null)

    try {
      const res = await IncidentAPI.fixFile(
        incident.id,
        project.id,
        filePath,
        token
      )
      setFixResult(res)
    } catch {
      setFixError("Failed to generate fix")
    } finally {
      setFixLoading(false)
    }
  }

  if (!project) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="animate-spin text-zinc-500" size={32} />
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col min-w-0">
      {/* ================= HEADER ================= */}
      <header className="z-20 flex min-h-[72px] items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-6 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-6 overflow-hidden">
          <div>
            <h1 className="text-lg font-bold text-zinc-100 truncate">
              {project.name}
            </h1>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-zinc-500">
                Production
              </span>
            </div>
          </div>

          <div className="hidden sm:block">
            <ProjectCredentials
              projectId={project.id}
              projectSecret={project.project_secret}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* ✅ MOBILE LIST BUTTON */}
          <button
            onClick={() => setShowLists(true)}
            className="xl:hidden rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-800"
          >
            Open Lists
          </button>

          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800">
            <Settings size={18} className="text-zinc-400" />
          </button>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      {showLists && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 xl:hidden"
            onClick={() => setShowLists(false)}
          />

          <div className="fixed inset-y-0 left-0 z-50 w-[90%] max-w-sm bg-zinc-950 border-r border-zinc-800 xl:hidden">
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <span className="text-sm font-bold">Incidents & Files</span>
              <button
                onClick={() => setShowLists(false)}
                className="text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-4 space-y-8 overflow-y-auto">
              <PriorityIncidentList onSelect={() => setShowLists(false)} />
              <FileList onSelect={() => setShowLists(false)} />
            </div>
          </div>
        </>
      )}

      {/* ================= CONTENT ================= */}
      <div className="flex flex-1 overflow-hidden">
        {/* DESKTOP LEFT PANE */}
        <section className="hidden w-[360px] shrink-0 border-r border-zinc-800 bg-zinc-950/50 xl:flex">
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <PriorityIncidentList />
            <FileList />
          </div>
        </section>

        {/* WORKSPACE */}
        <section className="flex-1 overflow-y-auto bg-[#09090b]">
          <div className="mx-auto max-w-6xl p-6 lg:p-10 space-y-8">
            <DiagnoseIncident />

            {filePath ? (
              <>
                <button
                  onClick={handleFix}
                  disabled={fixLoading}
                  className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white"
                >
                  {fixLoading ? "Analyzing..." : "Apply AI Fix"}
                </button>

                <FileViewer
                  original={fixResult?.original}
                  path={fixResult?.path}
                />

                {fixResult && (
                  <FixResult
                    fixed={fixResult.fixed}
                    explanation={fixResult.explanation}
                  />
                )}

                <FixActionPanel fixResult={fixResult} />
              </>
            ) : (
              <div className="flex h-[50vh] items-center justify-center border border-dashed border-zinc-800 rounded-3xl">
                <div className="text-center text-zinc-500">
                  <MonitorCheck size={32} className="mx-auto mb-4" />
                  Select a file to begin
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
