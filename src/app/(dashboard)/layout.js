"use client"

import { useState } from "react"
import SidebarContainer from "@/src/components/SidebarConatiner"
import { Menu, X } from "lucide-react"

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex h-screen w-full overflow-hidden bg-black text-white">

      {/* 🔴 MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 🟣 SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64
          transform transition-transform duration-300 ease-in-out
          bg-zinc-950 border-r border-zinc-800
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0
        `}
      >
        <SidebarContainer closeSidebar={() => setOpen(false)} />
      </aside>

      {/* 🔵 MAIN CONTENT */}
      <main className="relative flex flex-1 flex-col min-w-0">

        {/* 🟢 MOBILE HEADER */}
        <div className="flex h-14 items-center gap-3 border-b border-zinc-800 px-4 lg:hidden">
          <button
            onClick={() => setOpen(true)}
            className="p-2 text-zinc-400 hover:text-white"
          >
            <Menu size={20} />
          </button>
          <span className="text-sm font-bold tracking-tight">RADAR-AI</span>
        </div>

        {/* PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
