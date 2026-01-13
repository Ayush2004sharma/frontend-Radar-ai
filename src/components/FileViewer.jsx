"use client"

export default function FileViewer({ original, path }) {
  if (!original) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-500">
        No file selected
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
      <div className="mb-2 text-xs text-zinc-400 truncate">
        Original File — <span className="font-mono">{path}</span>
      </div>

      <pre className="max-h-[60vh] overflow-auto text-xs sm:text-sm text-red-300 whitespace-pre-wrap break-words">
        {original}
      </pre>
    </div>
  )
}
