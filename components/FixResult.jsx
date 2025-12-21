export default function FixResult({ fix }) {
  return (
    <section className="border border-neutral-800 rounded-lg p-4 bg-neutral-950">
      <h2 className="text-xl font-semibold mb-3 text-neutral-100">
        Fix Suggestion
      </h2>

      {!fix && (
        <p className="text-neutral-500 italic">
          No fix yet
        </p>
      )}

      {fix && (
        <div className="space-y-4">
          {/* Explanation */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-300 mb-1">
              Explanation
            </h3>
            <div className="bg-black border border-neutral-800 rounded p-3 text-neutral-200 text-sm">
              {fix.explanation}
            </div>
          </div>

          {/* Original code */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-300 mb-1">
              Original
            </h3>
            <pre
              className="
                bg-black
                border border-neutral-800
                rounded
                p-3
                text-neutral-200
                text-sm
                font-mono
                overflow-x-auto
                max-h-64
              "
            >
{fix.original}
            </pre>
          </div>

          {/* Fixed code */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-300 mb-1">
              Fixed
            </h3>
            <pre
              className="
                bg-black
                border border-neutral-800
                rounded
                p-3
                text-neutral-200
                text-sm
                font-mono
                overflow-x-auto
                max-h-64
              "
            >
{fix.fixed}
            </pre>
          </div>
        </div>
      )}
    </section>
  )
}
