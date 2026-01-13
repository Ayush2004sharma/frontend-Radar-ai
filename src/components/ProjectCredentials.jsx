"use client"

import React, { useState } from 'react'
import { Copy, Eye, EyeOff, Check, ShieldCheck, Terminal } from 'lucide-react'

export default function ProjectCredentials({ projectId, projectSecret }) {
  const [showSecret, setShowSecret] = useState(false)
  const [copiedField, setCopiedField] = useState(null)

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error("Failed to copy!", err)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 p-2 w-fit shadow-inner transition-all hover:border-zinc-700">
      
      {/* Project ID Section */}
      <div className="flex items-center gap-3 px-2">
        <div className="flex items-center gap-2">
          <Terminal size={14} className="text-blue-400" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Project ID</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-black/50 px-3 py-1.5 border border-zinc-800">
          <code className="text-xs font-mono text-zinc-300">{projectId}</code>
          <button
            onClick={() => copyToClipboard(projectId, 'id')}
            className="text-zinc-500 hover:text-white transition-all active:scale-90"
          >
            {copiedField === 'id' ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="hidden h-8 w-[1px] bg-zinc-800 sm:block" />

      {/* Project Secret Section */}
      <div className="flex items-center gap-3 px-2">
        <div className="flex items-center gap-2">
          <ShieldCheck size={14} className="text-amber-500/70" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Secret Key</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-black/50 px-3 py-1.5 border border-zinc-800">
          <code className="text-xs font-mono text-zinc-400">
            {showSecret ? projectSecret : "••••••••••••••••••••••••"}
          </code>
          
          <div className="flex items-center gap-2 ml-2 border-l border-zinc-800 pl-2">
            <button
              onClick={() => setShowSecret(!showSecret)}
              className="text-zinc-500 hover:text-white transition-all"
              title={showSecret ? "Hide" : "Show"}
            >
              {showSecret ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
            <button
              onClick={() => copyToClipboard(projectSecret, 'secret')}
              className="text-zinc-500 hover:text-white transition-all active:scale-90"
            >
              {copiedField === 'secret' ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}