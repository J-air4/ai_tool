"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { plans } from "../data/interventions"
import { ErrorMessage } from "./ErrorMessage"
import { toast } from "@/components/ui/use-toast"
import { ChevronRight, ChevronDown, Activity, Brain, Dumbbell, Home, Clipboard } from "lucide-react"

interface PlanModalProps {
  selectedSections: {
    intervention: string[]
    assistance: string[]
    observations: string[]
    plan: string[]
  }
  onUpdateSections: (sections: {
    intervention: string[]
    assistance: string[]
    observations: string[]
    plan: string[]
  }) => void
  onClose: () => void
  selectedNoteType: string
  selections: string[]
  onSelectionsChange: (selections: string[]) => void
}

export default function PlanModal({
  selectedSections,
  onUpdateSections,
  onClose,
  selectedNoteType,
  selections,
  onSelectionsChange,
}: PlanModalProps) {
  const [selectedContent, setSelectedContent] = useState<string[]>(selections)
  const [error, setError] = useState<string | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  useEffect(() => {
    setSelectedContent(selections)
  }, [selections])

  const getRelevantPlans = () => {
    switch (selectedNoteType) {
      case "self-care":
        return {
          "Self-Care and ADLs": plans["Self-Care and ADLs"],
          "Cognitive and Safety Awareness": plans["Cognitive and Safety Awareness"],
        }
      case "therapeutic-activities":
        return {
          "Functional Mobility": plans["Functional Mobility"],
          "Balance and Coordination": plans["Balance and Coordination"],
          "Strength and Endurance": plans["Strength and Endurance"],
        }
      default:
        return plans
    }
  }

  const categoryIcons: { [key: string]: React.ReactNode } = {
    "Self-Care and ADLs": <Home className="w-5 h-5" />,
    "Cognitive and Safety Awareness": <Brain className="w-5 h-5" />,
    "Functional Mobility": <Activity className="w-5 h-5" />,
    "Balance and Coordination": <Activity className="w-5 h-5" />,
    "Strength and Endurance": <Dumbbell className="w-5 h-5" />,
  }

  const handleContentSelection = (plan: string) => {
    setSelectedContent((prev) => (prev.includes(plan) ? prev.filter((item) => item !== plan) : [...prev, plan]))
  }

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleAdd = () => {
    if (selectedContent.length === 0) {
      setError("Please select at least one plan item")
      return
    }
    if (selectedContent.length > 10) {
      setError("Please select no more than 10 plan items")
      return
    }
    if (selectedContent.some((content) => content.length > 150)) {
      setError("Each selected plan item must be 150 characters or less")
      return
    }
    setError(null)
    onUpdateSections({
      ...selectedSections,
      plan: [...selectedSections.plan, ...selectedContent],
    })
    onSelectionsChange(selectedContent)
    toast({
      title: "Plan Updated",
      description: `${selectedContent.length} plan item(s) added successfully.`,
    })
    onClose()
  }

  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
      <h2 className="text-2xl font-bold text-emerald-400 mb-4">Plan for Next Session</h2>
      <div className="flex-1 overflow-hidden flex flex-col">
        {selectedContent.length > 0 ? (
          <Card className="bg-slate-800 border-slate-700 p-4 mb-4">
            <div className="flex items-center mb-4">
              <Clipboard className="w-5 h-5 mr-2" />
              <h3 className="text-lg font-medium text-emerald-400">Selected Items</h3>
            </div>
            <ScrollArea className="h-[100px]">
              <div className="space-y-2">
                {selectedContent.map((content) => (
                  <div key={content} className="text-sm text-slate-300 bg-slate-700 p-2 rounded">
                    {content}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        ) : (
          <div className="text-sm text-slate-400 mb-4">No items selected</div>
        )}
        <ScrollArea className="w-full" orientation="horizontal">
          <div className="flex space-x-4 pb-4">
            {Object.entries(getRelevantPlans()).map(([category, items], index) => (
              <Card key={category} className="p-4 bg-slate-800 border-slate-700 min-w-[300px]">
                <Button
                  variant="ghost"
                  className="w-full flex justify-between items-center mb-2"
                  onClick={() => toggleCategory(category)}
                >
                  <div className="flex items-center">
                    {categoryIcons[category]}
                    <h3 className="text-lg font-medium text-emerald-400 ml-2">{category}</h3>
                  </div>
                  {expandedCategories.includes(category) ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </Button>
                {expandedCategories.includes(category) && (
                  <div className="mt-2 space-y-2">
                    {items.map((plan) => (
                      <Button
                        key={plan}
                        variant="ghost"
                        className={`w-full justify-start text-left ${
                          selectedContent.includes(plan)
                            ? "bg-emerald-600 text-white"
                            : "text-slate-200 hover:bg-slate-700"
                        }`}
                        onClick={() => handleContentSelection(plan)}
                      >
                        {plan}
                      </Button>
                    ))}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
      {error && <ErrorMessage message={error} />}
      <div className="flex justify-between mt-4 pt-2 border-t border-slate-700">
        <Button onClick={onClose} variant="outline">
          Cancel Changes
        </Button>
        <Button
          onClick={handleAdd}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
          disabled={selectedContent.length === 0 || selectedContent.length > 10}
        >
          Save and Continue
        </Button>
      </div>
    </div>
  )
}

