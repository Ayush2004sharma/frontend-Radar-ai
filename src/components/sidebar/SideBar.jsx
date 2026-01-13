"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useRadar } from "@/src/context/RadarContext"
import { ProjectAPI } from "@/src/lib/api"

import SidebarHeader from "./SideBarHeader"
import SidebarActions from "./SidebarActions"
import ProjectList from "./ProjectList"
import SidebarUser from "./SidebarUser"
import SidebarSearch from "./SidebarSearch" // ✅ MISSING IMPORT

export default function Sidebar({
  userName = "User",
  wsConnected = false,
  onNavigate,
}) {
  const router = useRouter()
  const { state, dispatch } = useRadar()
  const { token, project } = state

  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState("")

  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [collapsed, setCollapsed] = useState(false)

  const filteredProjects = query
    ? projects.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      )
    : projects

  /* ---------- load projects ---------- */
  useEffect(() => {
    if (!token) return
    setLoading(true)
    ProjectAPI.listProjects(token)
      .then(setProjects)
      .finally(() => setLoading(false))
  }, [token])

  /* ---------- select project ---------- */
  function handleSelectProject(p) {
    dispatch({ type: "SET_PROJECT", payload: p })
    onNavigate?.()
    setSearchOpen(false)     // ✅ close search
    setQuery("")             // ✅ reset
    router.push(`/projects/${p.id}`)
  }

  /* ---------- logout ---------- */
  function handleLogout() {
    dispatch({ type: "LOGOUT" })
    onNavigate?.()
    router.push("/login")
  }

  /* ---------- ⌘K / Ctrl+K ---------- */
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  return (
    <div
      className={`flex h-full flex-col border-r border-zinc-800 bg-zinc-950 transition-all ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <SidebarHeader collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* 🔍 SEARCH INPUT (THIS WAS MISSING) */}
      <SidebarSearch
        open={searchOpen}
        query={query}
        setQuery={setQuery}
        onClose={() => {
          setSearchOpen(false)
          setQuery("")
        }}
      />

      {/* Actions */}
      <SidebarActions
        collapsed={collapsed}
        onNewProject={() => {
          onNavigate?.()
          router.push("/projects/new")
        }}
        onSearchOpen={() => setSearchOpen(true)} // ✅ works now
      />

      {/* Projects */}
      <ProjectList
        projects={filteredProjects}
        loading={loading}
        collapsed={collapsed}
        activeProject={project}
        onSelect={handleSelectProject}
      />

      {/* User */}
      <SidebarUser
        userName={userName}
        wsConnected={wsConnected}
        collapsed={collapsed}
        onLogout={handleLogout}
      />
    </div>
  )
}
