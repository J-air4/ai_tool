"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ModalHeader } from "./ModalHeader"
import { ErrorMessage } from "./ErrorMessage"
import { toast } from "@/components/ui/use-toast"

interface MeasurableOutcomesModalProps {
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
  onReturnToMainOutcomes: () => void
}

const outcomeCategories = {
  "Bed Mobility": [
    "Improved rolling ability",
    "Enhanced supine to sit transitions",
    "Increased independence in repositioning",
    "Improved bed mobility endurance",
    "Enhanced use of assistive devices for bed mobility",
  ],
  "Upper Extremity ROM": [
    "Increased shoulder flexion",
    "Improved elbow extension",
    "Enhanced wrist mobility",
    "Increased forearm supination/pronation",
    "Improved finger dexterity",
  ],
  "Trunk Control": [
    "Improved seated balance",
    "Enhanced core stability",
    "Increased trunk rotation",
    "Improved postural control",
    "Enhanced ability to maintain midline",
  ],
  Balance: [
    "Improved static standing balance",
    "Enhanced dynamic balance",
    "Increased confidence in balance tasks",
    "Improved reactive balance strategies",
    "Enhanced balance during functional tasks",
  ],
  "Activities of Daily Living": [
    "Improved dressing ability",
    "Enhanced grooming efficiency",
    "Improved medication management",
    "Enhanced meal preparation skills",
    "Improved bathing independence",
  ],
}

const measurementUnits = {
  Distance: ["inches", "centimeters", "feet", "meters"],
  Time: ["seconds", "minutes", "hours"],
  Repetitions: ["reps"],
  Weight: ["pounds", "kilograms"],
  Percentage: ["%"],
  "Pain Scale": ["out of 10"],
  Level: ["level"],
}

export default function MeasurableOutcomesModal({
  selectedSections,
  onUpdateSections,
  onClose,
  onReturnToMainOutcomes,
}: MeasurableOutcomesModalProps) {
  const [selectedOutcomes, setSelectedOutcomes] = useState<string[]>([])
  const [specificOutcomes, setSpecificOutcomes] = useState<{ [key: string]: string }>({})
  const [measurementType, setMeasurementType] = useState<string>("")
  const [measurementValue, setMeasurementValue] = useState<string>("")
  const [measurementUnit, setMeasurementUnit] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (
      measurementType &&
      !measurementUnits[measurementType as keyof typeof measurementUnits].includes(measurementUnit)
    ) {
      setMeasurementUnit("")
    }
  }, [measurementType, measurementUnit])

  const validateInputs = () => {
    if (selectedOutcomes.length === 0) {
      setError("Please select at least one outcome")
      return false
    }
    if (selectedOutcomes.length > 5) {
      setError("Please select no more than 5 outcomes")
      return false
    }
    if (measurementType && (!measurementValue || !measurementUnit)) {
      setError("Please provide both measurement value and unit when selecting a measurement type")
      return false
    }
    setError(null)
    return true
  }

  const handleAdd = () => {
    if (validateInputs()) {
      const formattedOutcomes = selectedOutcomes.map((outcome) => {
        const specific = specificOutcomes[outcome]
        const measurement =
          measurementType && measurementValue && measurementUnit
            ? `${measurementType}: ${measurementValue} ${measurementUnit}`
            : ""
        const formattedOutcome = `${outcome}${specific ? ` - ${specific}` : ""}${measurement ? ` (${measurement})` : ""}`
        if (formattedOutcome.length > 150) {
          setError(`The outcome "${outcome}" is too long. Please make it more concise.`)
          return null
        }
        return formattedOutcome
      })

      if (formattedOutcomes.some((outcome) => outcome === null)) {
        return
      }

      onUpdateSections({
        ...selectedSections,
        outcomes: [...selectedSections.outcomes, ...formattedOutcomes],
      })
      toast({
        title: "Measurable Outcomes Added",
        description: `${formattedOutcomes.length} measurable outcome(s) added successfully.`,
      })
      onClose()
    }
  }

  const handleOutcomeChange = (outcome: string, checked: boolean) => {
    setSelectedOutcomes((prev) => {
      if (checked) {
        if (prev.length >= 5) {
          setError("You can select a maximum of 5 outcomes")
          return prev
        }
        return [...prev, outcome]
      } else {
        return prev.filter((item) => item !== outcome)
      }
    })
    if (!checked) {
      setSpecificOutcomes((prev) => {
        const { [outcome]: _, ...rest } = prev
        return rest
      })
    }
  }

  const handleSpecificOutcomeChange = (outcome: string, value: string) => {
    setSpecificOutcomes((prev) => ({
      ...prev,
      [outcome]: value,
    }))
  }

  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
      <ModalHeader title="Measurable Outcomes" onClose={onClose} />
      <div className="flex-1 overflow-hidden">
        <div className="grid grid-cols-2 gap-4 h-full">
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-6 pr-4">
              {Object.entries(outcomeCategories).map(([category, outcomes]) => (
                <Card key={category} className="p-4 bg-slate-800 border-slate-700">
                  <h3 className="text-sm font-medium text-emerald-400 mb-2">{category}</h3>
                  <div className="space-y-2">
                    {outcomes.map((outcome) => (
                      <div key={outcome} className="space-y-1">
                        <div className="flex items-start space-x-2">
                          <Checkbox
                            id={outcome}
                            checked={selectedOutcomes.includes(outcome)}
                            onCheckedChange={(checked) => handleOutcomeChange(outcome, checked as boolean)}
                            className="mt-1 border-emerald-400"
                          />
                          <label htmlFor={outcome} className="text-sm text-slate-200 cursor-pointer">
                            {outcome}
                          </label>
                        </div>
                        {selectedOutcomes.includes(outcome) && (
                          <Input
                            placeholder="Add specificity"
                            value={specificOutcomes[outcome] || ""}
                            onChange={(e) => handleSpecificOutcomeChange(outcome, e.target.value)}
                            className="w-full mt-1 bg-slate-700 border-slate-600 text-slate-200"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>

          <div className="space-y-4">
            <Card className="p-4 bg-slate-800 border-slate-700">
              <h3 className="text-lg font-medium text-emerald-400 mb-4">Measurement</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="measurementType" className="text-sm text-slate-200">
                    Measurement Type
                  </Label>
                  <Select onValueChange={setMeasurementType} value={measurementType}>
                    <SelectTrigger id="measurementType" className="w-full bg-slate-700 border-slate-600 text-slate-200">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {Object.keys(measurementUnits).map((type) => (
                        <SelectItem key={type} value={type} className="text-slate-200">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="measurementValue" className="text-sm text-slate-200">
                    Value
                  </Label>
                  <Input
                    id="measurementValue"
                    type="number"
                    value={measurementValue}
                    onChange={(e) => setMeasurementValue(e.target.value)}
                    className="w-full bg-slate-700 border-slate-600 text-slate-200"
                  />
                </div>
                {measurementType && (
                  <div>
                    <Label htmlFor="measurementUnit" className="text-sm text-slate-200">
                      Unit
                    </Label>
                    <Select onValueChange={setMeasurementUnit} value={measurementUnit}>
                      <SelectTrigger
                        id="measurementUnit"
                        className="w-full bg-slate-700 border-slate-600 text-slate-200"
                      >
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        {measurementUnits[measurementType as keyof typeof measurementUnits].map((unit) => (
                          <SelectItem key={unit} value={unit} className="text-slate-200">
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </Card>
            <Card className="p-4 bg-slate-800 border-slate-700">
              <h3 className="text-lg font-medium text-emerald-400 mb-4">Selected Outcomes</h3>
              <ScrollArea className="h-[200px]">
                <div className="space-y-2">
                  {selectedOutcomes.map((outcome) => (
                    <div key={outcome} className="text-sm text-slate-300">
                      {outcome}
                      {specificOutcomes[outcome] && ` - ${specificOutcomes[outcome]}`}
                      {measurementType &&
                        measurementValue &&
                        measurementUnit &&
                        ` (${measurementType}: ${measurementValue} ${measurementUnit})`}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>
        </div>
      </div>
      {error && <ErrorMessage message={error} />}
      <div className="flex justify-between mt-4 pt-2 border-t border-slate-700">
        <Button onClick={onReturnToMainOutcomes} variant="outline" className="text-slate-200">
          Return to Main Outcomes
        </Button>
        <Button
          onClick={handleAdd}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
          disabled={selectedOutcomes.length === 0}
        >
          Add to Outcomes
        </Button>
      </div>
    </div>
  )
}

