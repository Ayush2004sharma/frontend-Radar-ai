import { Plus, Search } from "lucide-react"

export default function SidebarActions({
  collapsed,
  onNewProject,
  onSearchOpen, // 👈 receive callback
}) {
  return (
    <div className="px-2 space-y-1">
      <button
        onClick={onNewProject}
        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-zinc-800"
      >
        <Plus size={16} />
        {!collapsed && "New Project"}
      </button>

      <button
        onClick={onSearchOpen}   // ✅ works
        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-zinc-800"
      >
        <Search size={16} />
        {!collapsed && "Search (⌘K)"}
      </button>
    </div>
  )
}
