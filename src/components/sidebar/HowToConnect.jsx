"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

export default function Process({ open, onClose }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEsc)
    return () => window.removeEventListener("keydown", handleEsc)
  }, [onClose])

  if (!mounted || !open) return null

  return createPortal(
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl h-[85vh] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-white">
              🚀 Setup Radar AI
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Connect your backend in under 1 minute
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white text-xl"
          >
            ×
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto smooth-scroll custom-scrollbar p-6 space-y-6 text-sm text-zinc-300">

          {/* STEP 1 */}
          <Step
            title="1️⃣ Install Radar SDK"
            desc={
              <>
                Run this command inside your backend project:
                <CodeBlock command="pip install radar-ai" />
              </>
            }
          />

          {/* STEP 2 */}
          <Step
            title="2️⃣ Connect Your Project"
            desc={
              <>
                Start Radar using your Project ID and Secret:
                <CodeBlock command="radar --project-id YOUR_PROJECT_ID --secret YOUR_SECRET --service backend" />
              </>
            }
          />

          {/* STEP 3 */}
          <Step
            title="3️⃣ Create Logger File (Required)"
            desc={
              <>
                Create a file named <b>logger.js</b> inside your backend root:

                <CodeBlock
                  command={`import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return \`\${timestamp} [\${level.toUpperCase()}] \${message}\`;
    })
  ),
  transports: [
    new transports.File({ filename: "app.log" }),
    new transports.Console()
  ]
});

export default logger;`}
                />
              </>
            }
          />

          {/* STEP 4 */}
          {/* STEP 4 */}
<Step
  title="4️⃣ Connect Logger In Your Server"
  desc={
    <>
      Import logger inside your server and add a log entry:

      <CodeBlock
        command={`import logger from './logger.js';

logger.info("Server started");`}
      />
    </>
  }
/>
          

          {/* STEP 5 */}
          <Step
            title="5️⃣ Start Your Application"
            desc={
              <>
                Run your backend normally:
                <CodeBlock command="npm run dev" />
                <CodeBlock command="uvicorn main:app --reload" />
                Radar will automatically monitor logs in real-time.
              </>
            }
          />

          {/* STEP 6 */}
          <Step
            title="6️⃣ Diagnose Incidents"
            desc="When errors occur, Radar detects incidents, ranks relevant files, and generates AI-powered fixes automatically."
          />

          {/* STEP 7 */}
          <Step
            title="7️⃣ 🔐 Privacy First"
            desc="Radar never stores your full source code. Files are requested only when required for debugging."
          />

        </div>
      </div>
    </div>,
    document.body
  )
}

function Step({ title, desc }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition">
      <h3 className="text-white font-medium mb-2">{title}</h3>
      <div className="text-zinc-300 leading-relaxed space-y-3">{desc}</div>
    </div>
  )
}

function CodeBlock({ command }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative mt-3">
      <pre className="bg-black/60 border border-zinc-700 text-green-400 text-xs p-3 pr-20 rounded-lg overflow-x-auto custom-scrollbar">
        <code>{command}</code>
      </pre>

      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 text-xs bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1 rounded-md transition"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  )
}