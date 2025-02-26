"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ErrorMessage } from "./ErrorMessage"
import { toast } from "@/components/ui/use-toast"

interface OutcomesModalProps {
  selectedSections: {
    intervention: string[]
    assistance: string[]
    observations: string[]
    outcomes: string[]
    plan: string[]
  }
  onUpdateSections: (sections: {
    intervention: string[]
    assistance: string[]
    observations: string[]
    outcomes: string[]
    plan: string[]
  }) => void
  onClose: () => void
  onOpenMeasurableOutcomes: () => void
  selections: {
    selectedOutcomeType: "Progress Indicators" | "Continuing Needs"
    selectedOutcome: string
    selectedComponent: string
    selectedPerformance: string
  }
  onSelectionsChange: (selections: {
    selectedOutcomeType: "Progress Indicators" | "Continuing Needs"
    selectedOutcome: string
    selectedComponent: string
    selectedPerformance: string
  }) => void
}

const performanceOutcomes = {
  "Progress Indicators": [
    "demonstrated improved independence with",
    "showed increased efficiency during",
    "exhibited enhanced safety awareness during",
    "displayed better control during",
  ],
  "Continuing Needs": [
    "continued to require assistance for",
    "needed ongoing support with",
    "still requiring cues for",
    "maintained need for help with",
  ],
}

const componentSpecificPerformances = {
  Dressing: [
    "with sleeve management",
    "with button manipulation",
    "with garment positioning",
    "with fastener management",
  ],
  General: ["with task completion", "with safety awareness", "with environmental setup", "with tool manipulation"],
}

export default function OutcomesModal({
  selectedSections,
  onUpdateSections,
  onClose,
  onOpenMeasurableOutcomes,
  selections,
  onSelectionsChange,
}: OutcomesModalProps) {
  const [selectedOutcomeType, setSelectedOutcomeType] = useState<"Progress Indicators" | "Continuing Needs">(
    selections.selectedOutcomeType,
  )
  const [selectedOutcome, setSelectedOutcome] = useState<string>(selections.selectedOutcome)
  const [selectedComponent, setSelectedComponent] = useState<string>(selections.selectedComponent)
  const [selectedPerformance, setSelectedPerformance] = useState<string>(selections.selectedPerformance)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setSelectedOutcomeType(selections.selectedOutcomeType)
    setSelectedOutcome(selections.selectedOutcome)
    setSelectedComponent(selections.selectedComponent)
    setSelectedPerformance(selections.selectedPerformance)
  }, [selections])

  const validateInputs = () => {
    if (!selectedOutcome || !selectedComponent || !selectedPerformance) {
      setError("Please select all outcome components")
      return false
    }
    setError(null)
    return true
  }

  const handleAdd = () => {
    if (validateInputs()) {
      const newOutcome = `Patient ${selectedOutcome} ${selectedPerformance}`
      if (newOutcome.length > 150) {
        setError("The generated outcome is too long. Please make different selections.")
        return
      }
      onUpdateSections({
        ...selectedSections,
        outcomes: [...selectedSections.outcomes, newOutcome],
      })
      onSelectionsChange({
        selectedOutcomeType,
        selectedOutcome,
        selectedComponent,
        selectedPerformance,
      })
      toast({
        title: "Outcome Added",
        description: "New outcome added successfully.",
      })
      onClose()
    }
  }

  return (
    <div className="flex flex-col h-[400px]">
      <div className="space-y-4 flex-grow overflow-y-auto">
        <h2 className="text-xl font-semibold text-emerald-400">Outcomes</h2>
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-slate-200 mb-2">Select Outcome Type</Label>
            <RadioGroup
              onValueChange={(value) => setSelectedOutcomeType(value as "Progress Indicators" | "Continuing Needs")}
              defaultValue="Progress Indicators"
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Progress Indicators" id="progress" />
                <Label htmlFor="progress">Progress Indicators</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Continuing Needs" id="needs" />
                <Label htmlFor="needs">Continuing Needs</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="outcomeSelect" className="text-sm font-medium text-slate-200 mb-2">
              Select Outcome
            </Label>
            <Select onValueChange={setSelectedOutcome} value={selectedOutcome}>
              <SelectTrigger id="outcomeSelect" className="w-full bg-slate-700 border-slate-600 text-slate-200">
                <SelectValue placeholder="Select outcome" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {performanceOutcomes[selectedOutcomeType].map((outcome) => (
                  <SelectItem key={outcome} value={outcome} className="text-slate-200">
                    {outcome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="componentSelect" className="text-sm font-medium text-slate-200 mb-2">
              Select Component
            </Label>
            <Select onValueChange={setSelectedComponent} value={selectedComponent}>
              <SelectTrigger id="componentSelect" className="w-full bg-slate-700 border-slate-600 text-slate-200">
                <SelectValue placeholder="Select component" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {Object.keys(componentSpecificPerformances).map((component) => (
                  <SelectItem key={component} value={component} className="text-slate-200">
                    {component}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedComponent && (
            <div>
              <Label htmlFor="performanceSelect" className="text-sm font-medium text-slate-200 mb-2">
                Select Performance
              </Label>
              <Select onValueChange={setSelectedPerformance} value={selectedPerformance}>
                <SelectTrigger id="performanceSelect" className="w-full bg-slate-700 border-slate-600 text-slate-200">
                  <SelectValue placeholder="Select performance" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {componentSpecificPerformances[selectedComponent as keyof typeof componentSpecificPerformances].map(
                    (performance) => (
                      <SelectItem key={performance} value={performance} className="text-slate-200">
                        {performance}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <Card className="bg-slate-800 border-slate-700 p-4 mt-4">
          <h3 className="text-lg font-medium text-emerald-400 mb-4">Selected Outcome</h3>
          <p className="text-sm text-slate-300">
            {selectedOutcome && selectedPerformance
              ? `Patient ${selectedOutcome} ${selectedPerformance}`
              : "No outcome selected"}
          </p>
        </Card>
      </div>
      {error && <ErrorMessage message={error} />}
      <div className="flex justify-between mt-4 pt-2 border-t border-slate-700">
        <Button onClick={onOpenMeasurableOutcomes} variant="outline" className="text-slate-200">
          Measurable Outcomes
        </Button>
        <Button
          onClick={handleAdd}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
          disabled={!selectedOutcome || !selectedComponent || !selectedPerformance}
        >
          Add to Outcomes
        </Button>
      </div>
    </div>
  )
}

