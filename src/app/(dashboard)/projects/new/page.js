"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ProjectAPI } from "@/src/lib/api"
import { useRadar } from "@/src/context/RadarContext"
import { Loader2, Plus, ShieldAlert, ArrowLeft } from "lucide-react"

export default function NewProjectPage() {
  const router = useRouter()
  const { state, dispatch } = useRadar()
  const { token } = state

  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // 🔐 AUTH GUARD
  useEffect(() => {
    if (!token) router.push("/login")
  }, [token, router])

  async function handleCreate(e) {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    setError(null)

    try {
      const res = await ProjectAPI.createProject(name, token)

      // ✅ Update Global State with the full project data
      // This ensures the Dashboard Header has the info it needs immediately
      dispatch({
        type: "SET_PROJECT",
        payload: {
          id: res.project_id,
          name: name,
          project_secret: res.project_secret
        },
      })

      // ✅ Redirect immediately to the new project's dashboard
      router.push(`/projects/${res.project_id}`)
    } catch (err) {
      setError("Failed to create project. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex-1 overflow-y-auto bg-[#09090b] p-6 lg:p-12">
      <div className="max-w-2xl mx-auto">
        {/* Navigation Back */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 text-sm group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </button>

        {/* Page Title */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-white">Create New Project</h1>
          <p className="text-zinc-500 mt-2 text-lg">Set up a new workspace to start monitoring incidents.</p>
        </header>

        {/* Simplified Creation Form */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleCreate} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                Project Display Name
              </label>
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Backend Production"
                className="w-full rounded-xl bg-black border border-zinc-800 p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all text-lg"
              />
            </div>

            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm animate-in fade-in slide-in-from-top-1">
                <ShieldAlert size={18} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-500 px-6 py-4 font-bold text-white transition-all active:scale-[0.98] shadow-lg shadow-blue-600/20"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Initializing Workspace...</span>
                </>
              ) : (
                <>
                  <Plus size={20} />
                  <span>Create Project</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}