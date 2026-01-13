"use client"

import { Search, X } from "lucide-react"
import { useEffect, useRef } from "react"

export default function SidebarSearch({
  open,
  query,
  setQuery,
  onClose,
}) {
  const inputRef = useRef(null)

  // auto-focus
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // ESC to close
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  if (!open) return null

  return (
    <div className="px-3 py-2">
      <div className="flex items-center gap-2 rounded-md bg-zinc-900 px-3 py-2">
        <Search size={16} className="text-zinc-400" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
        />
        <button onClick={onClose}>
          <X size={14} className="text-zinc-400 hover:text-white" />
        </button>
      </div>
    </div>
  )
}
