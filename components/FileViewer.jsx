"use client"

import { readFile, fixFile } from "../lib/api"
import { useEffect, useState } from "react"

export default function FileViewer({
  file,
  service,
  setFix,
  projectId,
  projectSecret,
}) {
  const [content, setContent] = useState(null)

  useEffect(() => {
    if (!file) return
    readFile(file.path).then(res => setContent(res))
  }, [file])

  const runFix = async () => {
    if (!file) return

    const res = await fixFile({
      project_id: projectId,
      project_secret: projectSecret,
      service,
      path: file.path,
    })
    setFix(res)
  }

  return (
    <section className="border border-neutral-800 rounded-lg p-4 bg-neutral-950">
      <h2 className="text-xl font-semibold mb-3 text-neutral-100">
        File Viewer
      </h2>

      <div
        className="
          bg-black
          border border-neutral-800
          rounded
          p-3
          text-sm
          text-neutral-200
          font-mono
          overflow-x-auto
          max-h-96
        "
      >
        {content?.content || (
          <span className="text-neutral-500 italic">
            No file selected
          </span>
        )}
      </div>

      {file && (
        <div className="mt-3">
          <button
            onClick={runFix}
            className="
              px-4 py-2
              rounded
              bg-neutral-200
              text-black
              font-medium
              hover:bg-neutral-300
              transition
            "
          >
            Suggest Fix
          </button>
        </div>
      )}
    </section>
  )
}
