export default function FileList({ files, onSelect }) {
  return (
    <section className="border border-neutral-800 rounded-lg p-4 bg-neutral-950">
      <h2 className="text-xl font-semibold mb-3 text-neutral-100">
        Related Files
      </h2>

      {files.length === 0 && (
        <p className="text-neutral-500 italic">
          No related files yet…
        </p>
      )}

      <div className="space-y-1">
        {files.map(f => (
          <div
            key={f.path}
            onClick={() => onSelect(f)}
            className="
              cursor-pointer
              rounded
              px-3 py-2
              border border-transparent
              text-neutral-200
              hover:bg-neutral-900
              hover:border-neutral-700
              transition
            "
          >
            <div className="font-mono text-sm">
              {f.path}
            </div>
            <div className="text-xs text-neutral-500">
              {f.reason}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
