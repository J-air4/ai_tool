"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { purposeOfTreatment } from "../data/purposeOfTreatment"
import { ErrorMessage } from "./ErrorMessage"
import { toast } from "@/components/ui/use-toast"

interface PurposeOfTreatmentModalProps {
  selectedSections: {
    purposeOfTreatment: string[]
    intervention: string[]
    assistance: string[]
    observations: string[]
    outcomes: string[]
    plan: string[]
  }
  onUpdateSections: (sections: {
    purposeOfTreatment: string[]
    intervention: string[]
    assistance: string[]
    observations: string[]
    outcomes: string[]
    plan: string[]
  }) => void
  onClose: () => void
  selections: string[]
  onSelectionsChange: (selections: string[]) => void
}

export default function PurposeOfTreatmentModal({
  selectedSections,
  onUpdateSections,
  onClose,
  selections,
  onSelectionsChange,
}: PurposeOfTreatmentModalProps) {
  const [selectedContent, setSelectedContent] = useState<string[]>(selections)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setSelectedContent(selections)
  }, [selections])

  const handleAdd = () => {
    try {
      if (selectedContent.length === 0) {
        setError("Please select at least one purpose of treatment")
        return
      }
      if (selectedContent.length > 5) {
        setError("Please select no more than 5 purposes of treatment")
        return
      }
      if (selectedContent.some((content) => content.length > 100)) {
        setError("Each selected purpose must be 100 characters or less")
        return
      }
      setError(null)
      onUpdateSections({
        ...selectedSections,
        purposeOfTreatment: [...selectedContent],
      })
      onSelectionsChange(selectedContent)
      toast({
        title: "Purpose of Treatment Updated",
        description: `${selectedContent.length} item(s) added successfully.`,
      })
      onClose()
    } catch (error) {
      console.error("Error adding purpose of treatment:", error)
      setError("An unexpected error occurred. Please try again.")
    }
  }

  const validateSelection = (content: string) => {
    if (selectedContent.length >= 5 && !selectedContent.includes(content)) {
      setError("You can select a maximum of 5 purposes of treatment")
      return false
    }
    setError(null)
    return true
  }

  const handleContentSelection = (content: string) => {
    if (validateSelection(content)) {
      setSelectedContent((prev) =>
        prev.includes(content) ? prev.filter((item) => item !== content) : [...prev, content],
      )
    }
  }

  useEffect(() => {
    if (selectedContent.length > 0) {
      setError(null)
    }
  }, [selectedContent])

  return (
    <div className="flex flex-col h-[400px]">
      <div className="space-y-4 flex-grow overflow-y-auto">
        <h2 className="text-xl font-semibold text-emerald-400">Purpose of Treatment</h2>
        <p className="text-sm text-slate-300">Select 1-5 purposes for this treatment session.</p>
        <div className="grid grid-cols-1 gap-4">
          <ScrollArea className="h-[280px] pr-4">
            <div className="space-y-2">
              {purposeOfTreatment.map((purpose) => (
                <div key={purpose} className="flex items-start space-x-2">
                  <Checkbox
                    id={purpose}
                    checked={selectedContent.includes(purpose)}
                    onCheckedChange={() => handleContentSelection(purpose)}
                    className="mt-1 border-emerald-400"
                    aria-label={`Select purpose: ${purpose}`}
                  />
                  <label htmlFor={purpose} className="text-sm text-slate-200 cursor-pointer">
                    {purpose}
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>

          <Card className="bg-slate-800 border-slate-700 p-4">
            <h3 className="text-lg font-medium text-emerald-400 mb-4">Selected Content</h3>
            <ScrollArea className="h-[120px]">
              <div className="space-y-2">
                {selectedContent.map((content) => (
                  <div key={content} className="text-sm text-slate-300">
                    {content}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
      {error && <ErrorMessage message={error} />}
      <div className="flex justify-between mt-4 pt-2 border-t border-slate-700">
        <Button onClick={onClose} variant="outline">
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
          disabled={selectedContent.length === 0 || selectedContent.length > 5}
        >
          Add to Purpose of Treatment
        </Button>
      </div>
    </div>
  )
}

