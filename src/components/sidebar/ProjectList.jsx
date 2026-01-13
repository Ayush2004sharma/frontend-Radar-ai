import ProjectItem from "./ProjectItem"
import ProjectSkeleton from "./ProjectSkeleton"

export default function ProjectList({
  projects,
  loading,
  collapsed,
  activeProject,
  onSelect,
}) {
  return (
    <div className="mt-4 flex-1 overflow-y-auto px-2">
      {!collapsed && (
        <div className="px-3 pb-2 text-xs uppercase text-zinc-500">
          Projects
        </div>
      )}

      {loading ? (
        <ProjectSkeleton />
      ) : (
        projects.map((p) => (
          <ProjectItem
            key={p.id}
            project={p}
            collapsed={collapsed}
            active={activeProject?.id === p.id}
            onClick={() => onSelect(p)}
          />
        ))
      )}
    </div>
  )
}
