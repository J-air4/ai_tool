"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ErrorMessage } from "./ErrorMessage"
import { toast } from "@/components/ui/use-toast"

interface ObservationsModalProps {
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
  selections: string[]
  onSelectionsChange: (selections: string[]) => void
}

export default function ObservationsModal({
  selectedSections,
  onUpdateSections,
  onClose,
  selections,
  onSelectionsChange,
}: ObservationsModalProps) {
  const [selectedContent, setSelectedContent] = useState<string[]>(selections)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setSelectedContent(selections)
  }, [selections])

  const observations = {
    "Motor Control": [
      "Demonstrated decreased coordination during bilateral tasks",
      "Exhibited impaired motor planning during sequence",
      "Showed limited fine motor control with manipulation",
      "Displayed difficulty with timing and force regulation",
      "Presented with decreased ability to perform smooth, controlled movements",
      "Demonstrated inconsistent motor patterns during repetitive tasks",
      "Exhibited delayed initiation of voluntary movements",
      "Showed impaired ability to isolate individual joint movements",
      "Displayed difficulty with graded muscle contractions",
      "Presented with decreased motor adaptation to changing task demands",
      "Demonstrated impaired ability to maintain consistent movement speed",
    ],
    "Balance/Stability": [
      "Demonstrated poor static standing balance",
      "Required increased time for postural adjustments",
      "Showed decreased weight shifting ability",
      "Exhibited difficulty maintaining balance during dynamic tasks",
      "Displayed impaired righting reactions when balance was challenged",
      "Demonstrated increased postural sway during quiet standing",
      "Exhibited difficulty integrating sensory information for balance",
      "Showed impaired anticipatory postural adjustments",
      "Displayed decreased limits of stability in all directions",
      "Presented with difficulty maintaining balance with altered visual input",
      "Demonstrated impaired ability to recover balance after perturbations",
    ],
    "Safety Awareness": [
      "Demonstrated poor safety judgment during tasks",
      "Required frequent cues for environmental awareness",
      "Showed decreased recognition of limitations",
      "Exhibited impulsive behaviors during activities",
      "Displayed difficulty anticipating potential hazards",
      "Demonstrated inconsistent use of safety equipment",
      "Exhibited decreased awareness of body position in space",
      "Showed impaired ability to recognize fatigue signals",
      "Displayed difficulty adapting behavior to changing environments",
      "Presented with decreased ability to identify potential risks in tasks",
      "Demonstrated poor judgment in estimating physical capabilities",
    ],
    "Cognitive Function": [
      "Demonstrated difficulty following multi-step commands",
      "Required increased time for task processing",
      "Showed decreased problem-solving ability",
      "Exhibited impaired attention to task details",
      "Displayed difficulty with task initiation and completion",
      "Demonstrated impaired working memory during functional tasks",
      "Exhibited difficulty with divided attention in complex environments",
      "Showed decreased ability to inhibit irrelevant stimuli",
      "Displayed impaired cognitive flexibility when switching between tasks",
      "Presented with difficulty in planning and sequencing multi-step activities",
      "Demonstrated decreased ability to generalize learned strategies to new situations",
    ],
    Endurance: [
      "Demonstrated decreased activity tolerance",
      "Required frequent rest breaks during tasks",
      "Showed signs of fatigue with minimal exertion",
      "Exhibited decreased ability to sustain effort over time",
      "Displayed shortness of breath with light activities",
      "Demonstrated rapid onset of muscle fatigue during repetitive tasks",
      "Exhibited decreased endurance in maintaining postural control",
      "Showed impaired recovery rate following physical exertion",
      "Displayed decreased ability to maintain consistent performance over time",
      "Presented with reduced capacity for prolonged cognitive engagement",
      "Demonstrated difficulty managing energy expenditure across daily activities",
    ],
  }

  const validateSelection = (content: string) => {
    if (selectedContent.length >= 15 && !selectedContent.includes(content)) {
      setError("You can select a maximum of 15 observations")
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

  const handleAdd = () => {
    if (selectedContent.length === 0) {
      setError("Please select at least one observation")
      return
    }
    if (selectedContent.length > 15) {
      setError("Please select no more than 15 observations")
      return
    }
    if (selectedContent.some((content) => content.length > 150)) {
      setError("Each selected observation must be 150 characters or less")
      return
    }
    setError(null)
    onUpdateSections({
      ...selectedSections,
      observations: [...selectedSections.observations, ...selectedContent],
    })
    onSelectionsChange(selectedContent)
    toast({
      title: "Observations Updated",
      description: `${selectedContent.length} observation(s) added successfully.`,
    })
    onClose()
  }

  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
      <div className="flex-1 overflow-y-auto">
        <div className="sticky top-0 bg-slate-900 p-4 z-10 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-emerald-400 mb-4">Observations</h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ScrollArea className="h-[calc(100vh-250px)]">
              <div className="space-y-6 pr-4">
                {Object.entries(observations).map(([category, items]) => (
                  <Card key={category} className="bg-slate-800 border-slate-700 p-4">
                    <h3 className="text-sm font-medium text-emerald-400 mb-2">{category}</h3>
                    <div className="space-y-2">
                      {items.map((observation) => (
                        <div key={observation} className="flex items-start space-x-2">
                          <Checkbox
                            id={observation}
                            checked={selectedContent.includes(observation)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleContentSelection(observation)
                              } else {
                                setSelectedContent((prev) => prev.filter((item) => item !== observation))
                              }
                            }}
                            className="mt-1 border-emerald-400"
                            aria-label={`Select observation: ${observation}`}
                          />
                          <label htmlFor={observation} className="text-sm text-slate-200 cursor-pointer">
                            {observation}
                          </label>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>

            <Card className="bg-slate-800 border-slate-700 p-4">
              <h3 className="text-lg font-medium text-emerald-400 mb-4">Selected Content</h3>
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="space-y-2 pr-4">
                  {selectedContent.map((content) => (
                    <div key={content} className="text-sm text-slate-300 py-1 px-2 bg-slate-700 rounded">
                      {content}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>
        </div>
      </div>
      {error && <ErrorMessage message={error} />}
      <div className="sticky bottom-0 bg-slate-900 p-4 border-t border-slate-700 flex justify-between">
        <Button onClick={onClose} variant="outline">
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
          disabled={selectedContent.length === 0 || selectedContent.length > 15}
        >
          Add to Observations
        </Button>
      </div>
    </div>
  )
}

