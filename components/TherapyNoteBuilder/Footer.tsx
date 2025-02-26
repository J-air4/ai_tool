"use client"

import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Save, Upload, Clipboard, Trash2 } from "lucide-react"

interface FooterProps {
  onClearAll: () => void
  onCopyToClipboard: () => void
  preview: string
  onSave: () => void
  onLoad: () => void
}

export function Footer({ onClearAll, onCopyToClipboard, preview, onSave, onLoad }: FooterProps) {
  const handleCopyToClipboard = useCallback(() => {
    onCopyToClipboard()
  }, [onCopyToClipboard])

  return (
    <div className="flex justify-between items-center mt-6">
      <div className="space-x-2">
        <Button
          variant="destructive"
          onClick={onClearAll}
          className="bg-red-600 hover:bg-red-700 text-white"
          aria-label="Clear all content"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear All
        </Button>
      </div>
      <div className="space-x-2">
        <Button
          onClick={onSave}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center"
          aria-label="Save note"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Note
        </Button>
        <Button
          onClick={onLoad}
          className="bg-purple-600 hover:bg-purple-700 text-white flex items-center"
          aria-label="Load note"
        >
          <Upload className="mr-2 h-4 w-4" />
          Load Note
        </Button>
        <Button
          onClick={handleCopyToClipboard}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
          disabled={!preview}
          aria-label="Copy content to clipboard"
        >
          <Clipboard className="mr-2 h-4 w-4" />
          Copy to Clipboard
        </Button>
      </div>
    </div>
  )
}

