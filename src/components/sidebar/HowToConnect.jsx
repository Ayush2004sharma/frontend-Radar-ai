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
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="w-full max-w-2xl max-h-[85vh] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
            <div>
              <h2 className="text-lg font-semibold text-white">
                📘 How To Use
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Quick guide to use Radar AI
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
          <div className="p-6 space-y-6 overflow-y-auto text-sm text-zinc-300">

            <Step
              title="Create Project"
              desc="Click on New Project, enter your project name and create it."
            />

            <Step
              title="Connect WebSocket"
              desc="Ensure the connection status turns green."
            />

            <Step
              title="Diagnose Incident"
              desc="Select files and click Diagnose Incident to analyze issues."
            />

            <Step
              title="Monitor Output"
              desc="Review AI responses and logs in real time."
            />

          </div>
        </div>
      </div>
    </>,
    document.body
  )
}

function Step({ title, desc }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition">
      <h3 className="text-white font-medium mb-2">{title}</h3>
      <p>{desc}</p>
    </div>
  )
}