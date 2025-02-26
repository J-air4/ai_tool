"use client"

import { useMemo } from "react"
import { Card } from "@/components/ui/card"

interface RelatedSnippetsProps {
  selectedSnippets: string[]
  allSnippets: string[]
  onSelect: (snippet: string) => void
  selectedContent: string[]
}

export function RelatedSnippets({ selectedSnippets, allSnippets, onSelect, selectedContent }: RelatedSnippetsProps) {
  const relatedSnippets = useMemo(() => {
    const selected = new Set(selectedSnippets)
    return allSnippets.filter((snippet) => !selected.has(snippet)).slice(0, 5) // Limit to 5 related snippets
  }, [selectedSnippets, allSnippets])

  if (relatedSnippets.length === 0) return null

  return (
    <Card className="mt-4 p-4 bg-slate-800 border-slate-700">
      <h4 className="text-lg font-medium text-emerald-400 mb-2">Related Snippets</h4>
      <div className="space-y-2">
        {relatedSnippets.map((snippet, index) => (
          <div
            key={index}
            className={`p-2 rounded-md cursor-pointer transition-colors ${
              selectedContent.includes(snippet)
                ? "bg-emerald-600 text-white"
                : "bg-slate-700 text-slate-200 hover:bg-slate-600"
            }`}
            onClick={() => onSelect(snippet)}
          >
            <p className="text-sm">{snippet}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

