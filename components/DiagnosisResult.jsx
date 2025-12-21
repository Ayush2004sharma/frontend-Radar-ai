export default function DiagnosisResult({ diagnosis }) {
  return (
    <section className="border border-neutral-800 rounded-lg p-4 bg-neutral-950">
      <h2 className="text-xl font-semibold mb-3 text-neutral-100">
        Diagnosis Result
      </h2>

      {!diagnosis && (
        <p className="text-neutral-500 italic">Waiting for diagnosis…</p>
      )}

      {diagnosis && (
        <pre
          className="
            bg-black
            border border-neutral-800
            rounded
            p-3
            text-sm
            text-neutral-200
            overflow-x-auto
          "
        >
{JSON.stringify(diagnosis, null, 2)}
        </pre>
      )}
    </section>
  )
}
