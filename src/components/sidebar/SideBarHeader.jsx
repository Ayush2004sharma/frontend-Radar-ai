import { ChevronsLeft, ChevronsRight } from "lucide-react"

export default function SidebarHeader({ collapsed, setCollapsed }) {
  return (
    <div className="flex items-center justify-between px-3 py-3">
      {!collapsed && <span className="text-lg font-semibold">RADAR-AI</span>}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:block rounded p-1 hover:bg-zinc-800"
      >
        {collapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
      </button>
    </div>
  )
}
