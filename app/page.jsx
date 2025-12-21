"use client"

import { useState } from "react"
import MetricsPanel from "../components/MetricsPanel"
import DiagnosePanel from "../components/DiagnosePanel"
import DiagnosisResult from "../components/DiagnosisResult"
import FileList from "../components/FileList"
import FileViewer from "../components/FileViewer"
import FixResult from "../components/FixResult"

export default function Page() {
  const [service, setService] = useState("")
  const [diagnosis, setDiagnosis] = useState(null)
  const [files, setFiles] = useState([])
  const [selectedFile, setSelectedFile] = useState(null)
  const [fix, setFix] = useState(null)

  // new: let user type project_id + secret once at top,
  // handled inside DiagnosePanel, so keep them in Page
  const [projectId, setProjectId] = useState("")
  const [projectSecret, setProjectSecret] = useState("")

  return (
    <main className="min-h-screen bg-black text-neutral-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top: Diagnose input */}
        <DiagnosePanel
          service={service}
          setService={setService}
          setDiagnosis={setDiagnosis}
          setFiles={setFiles}
          projectId={projectId}
          projectSecret={projectSecret}
          setProjectId={setProjectId}
          setProjectSecret={setProjectSecret}
        />

        {/* Middle: 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FileList files={files} onSelect={setSelectedFile} />

          <DiagnosisResult diagnosis={diagnosis} />

          <MetricsPanel />
        </div>

        {/* Bottom */}
        <div className="grid grid-cols-1 gap-6">
          <FileViewer
            file={selectedFile}
            service={service}
            setFix={setFix}
            projectId={projectId}
            projectSecret={projectSecret}
          />

          <FixResult fix={fix} />
        </div>
      </div>
    </main>
  )
}
