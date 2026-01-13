import { Folder } from "lucide-react"

export default function ProjectItem({ project, collapsed, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm ${
        active ? "bg-zinc-800" : "hover:bg-zinc-800"
      }`}
    >
      <Folder size={16} />
      {!collapsed && (
        <>
          <span className="flex-1 truncate text-left">{project.name}</span>
          {active && (
            <span className="rounded bg-green-600 px-2 py-0.5 text-xs">
              ACTIVE
            </span>
          )}
        </>
      )}
    </button>
  )
}
