export default function ProjectSkeleton() {
  return (
    <div className="space-y-2 px-3">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="h-8 animate-pulse rounded-md bg-zinc-800"
        />
      ))}
    </div>
  )
}
