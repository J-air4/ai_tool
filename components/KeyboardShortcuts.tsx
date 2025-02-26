"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Keyboard } from "lucide-react"

interface KeyboardShortcutsProps {
  onCopyToClipboard: () => void
  onClearAll: () => void
  onOpenPurposeOfTreatment: () => void
  onOpenIntervention: () => void
  onOpenAssistance: () => void
  onOpenObservations: () => void
  onOpenPlan: () => void
  onOpenOutcomes: () => void
}

export function KeyboardShortcuts({
  onCopyToClipboard,
  onClearAll,
  onOpenIntervention,
  onOpenAssistance,
  onOpenObservations,
  onOpenPlan,
  onOpenOutcomes,
  onOpenPurposeOfTreatment,
}: KeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case "c":
            event.preventDefault()
            onCopyToClipboard()
            break
          case "x":
            event.preventDefault()
            onClearAll()
            break
          case "0":
            event.preventDefault()
            onOpenPurposeOfTreatment()
            break
          case "1":
            event.preventDefault()
            onOpenIntervention()
            break
          case "2":
            event.preventDefault()
            onOpenAssistance()
            break
          case "3":
            event.preventDefault()
            onOpenObservations()
            break
          case "4":
            event.preventDefault()
            onOpenPlan()
            break
          case "5":
            event.preventDefault()
            onOpenOutcomes()
            break
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [
    onCopyToClipboard,
    onClearAll,
    onOpenPurposeOfTreatment,
    onOpenIntervention,
    onOpenAssistance,
    onOpenObservations,
    onOpenPlan,
    onOpenOutcomes,
  ])

  return null
}

export function KeyboardShortcutsModal() {
  const [isOpen, setIsOpen] = useState(false)

  const shortcuts = [
    { key: "Ctrl + C", description: "Copy to clipboard" },
    { key: "Ctrl + X", description: "Clear all" },
    { key: "Ctrl + 0", description: "Open Purpose of Treatment" },
    { key: "Ctrl + 1", description: "Open Intervention" },
    { key: "Ctrl + 2", description: "Open Assistance" },
    { key: "Ctrl + 3", description: "Open Observations" },
    { key: "Ctrl + 4", description: "Open Plan" },
    { key: "Ctrl + 5", description: "Open Outcomes" },
  ]

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        <Keyboard className="mr-2 h-4 w-4" />
        Keyboard Shortcuts
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Keyboard Shortcuts</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            {shortcuts.map((shortcut) => (
              <div key={shortcut.key} className="flex justify-between">
                <span className="font-mono bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">{shortcut.key}</span>
                <span>{shortcut.description}</span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

