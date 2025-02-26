"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ErrorMessage } from "./ErrorMessage"
import { toast } from "@/components/ui/use-toast"

interface AssistanceModalProps {
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
  selections: {
    assistanceLevel: string
    selectedReasons: string[]
    cueingAssistance: string[]
    cueingLevel: string
    cueingReason: string
  }
  onSelectionsChange: (selections: {
    assistanceLevel: string
    selectedReasons: string[]
    cueingAssistance: string[]
    cueingLevel: string
    cueingReason: string
  }) => void
}

export default function AssistanceModal({
  selectedSections,
  onUpdateSections,
  onClose,
  selections,
  onSelectionsChange,
}: AssistanceModalProps) {
  const [assistanceLevel, setAssistanceLevel] = useState(selections.assistanceLevel)
  const [selectedReasons, setSelectedReasons] = useState<string[]>(selections.selectedReasons)
  const [cueingAssistance, setCueingAssistance] = useState<string[]>(selections.cueingAssistance)
  const [cueingLevel, setCueingLevel] = useState(selections.cueingLevel)
  const [cueingReason, setCueingReason] = useState(selections.cueingReason)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setAssistanceLevel(selections.assistanceLevel)
    setSelectedReasons(selections.selectedReasons)
    setCueingAssistance(selections.cueingAssistance)
    setCueingLevel(selections.cueingLevel)
    setCueingReason(selections.cueingReason)
  }, [selections])

  const assistanceLevels = [
    "Independent",
    "Modified Independent",
    "Supervision",
    "Contact Guard Assist",
    "Minimal Assist",
    "Moderate Assist",
    "Maximum Assist",
    "Total Assist",
  ]

  const reasonCategories = {
    physical: {
      title: "Physical",
      reasons: {
        balance: [
          "Impaired static balance",
          "Impaired dynamic balance",
          "Poor postural control",
          "Difficulty with weight shifting",
          "Instability during transitional movements",
        ],
        strength: [
          "Decreased upper extremity strength",
          "Decreased lower extremity strength",
          "Generalized weakness",
          "Reduced core strength",
          "Muscle fatigue during functional tasks",
        ],
        coordination: [
          "Impaired bilateral coordination",
          "Decreased motor control",
          "Poor movement planning",
          "Difficulty with sequencing of movements",
          "Impaired fine motor skills",
        ],
        endurance: [
          "Decreased activity tolerance",
          "Fatigue",
          "Cardiopulmonary limitations",
          "Reduced stamina during extended tasks",
          "Need for frequent rest breaks",
        ],
      },
    },
    cognitive: {
      title: "Cognitive",
      reasons: {
        attention: [
          "Impaired attention to task",
          "Difficulty maintaining focus",
          "Easily distracted by environmental stimuli",
          "Limited attention span",
          "Difficulty dividing attention between tasks",
        ],
        memory: [
          "Short-term memory deficits",
          "Difficulty recalling multi-step instructions",
          "Impaired working memory",
          "Difficulty with task sequencing",
          "Poor recall of safety precautions",
        ],
        problemSolving: [
          "Decreased problem-solving skills",
          "Difficulty generating solutions",
          "Impaired ability to anticipate obstacles",
          "Poor judgment in complex situations",
          "Difficulty adapting to changes in task demands",
        ],
        safety: [
          "Reduced safety awareness",
          "Impulsivity during task performance",
          "Difficulty recognizing environmental hazards",
          "Poor judgment of physical capabilities",
          "Inconsistent use of adaptive equipment",
        ],
      },
    },
  }

  const cueingLevels = ["Minimal", "Moderate", "Maximum"]

  const cueingReasons = {
    taskExecution: {
      title: "Task Execution",
      reasons: ["Task initiation", "Task continuation", "Task completion", "Proper technique", "Sequencing"],
    },
    cognitiveFunctioning: {
      title: "Cognitive Functioning",
      reasons: ["Attention to task", "Problem-solving", "Decision making", "Memory recall", "Information processing"],
    },
    safetyAndAwareness: {
      title: "Safety and Awareness",
      reasons: [
        "Safety awareness",
        "Environmental awareness",
        "Body awareness",
        "Spatial awareness",
        "Use of adaptive equipment",
      ],
    },
    communicationAndBehavior: {
      title: "Communication and Behavior",
      reasons: [
        "Following instructions",
        "Appropriate social interaction",
        "Emotional regulation",
        "Self-monitoring",
        "Asking for help when needed",
      ],
    },
    physicalAssistance: {
      title: "Physical Assistance",
      reasons: [
        "Balance support",
        "Postural alignment",
        "Movement guidance",
        "Facilitation of proper form",
        "Assistance with weight shifting",
      ],
    },
    environmentalAdaptation: {
      title: "Environmental Adaptation",
      reasons: [
        "Setup of task environment",
        "Modification of tools or equipment",
        "Adjustment of task demands",
        "Pacing of activity",
        "Grading of task complexity",
      ],
    },
  }

  const generateNote = () => {
    let note = `Patient required ${assistanceLevel.toLowerCase()} due to ${selectedReasons.join(", ").toLowerCase()}`
    if (cueingAssistance.length > 0 && cueingLevel && cueingReason) {
      note += `. ${cueingLevel} ${cueingAssistance.join(", ")} were provided for ${cueingReason.toLowerCase()}`
    }
    return note
  }

  const validateInputs = () => {
    if (!assistanceLevel) {
      setError("Please select an assistance level")
      return false
    }
    if (selectedReasons.length === 0) {
      setError("Please select at least one reason for assistance")
      return false
    }
    if (selectedReasons.length > 5) {
      setError("Please select no more than 5 reasons for assistance")
      return false
    }
    if (cueingAssistance.length > 0 && (!cueingLevel || !cueingReason)) {
      setError("Please select both cueing level and reason when cueing assistance is provided")
      return false
    }
    if (cueingAssistance.length > 3) {
      setError("Please select no more than 3 cueing assistance types")
      return false
    }
    setError(null)
    return true
  }

  const handleAdd = () => {
    if (validateInputs()) {
      const note = generateNote()
      if (note.length > 250) {
        setError("The generated note is too long. Please reduce the number of selections.")
        return
      }
      onUpdateSections({
        ...selectedSections,
        assistance: [...selectedSections.assistance, note],
      })
      onSelectionsChange({
        assistanceLevel,
        selectedReasons,
        cueingAssistance,
        cueingLevel,
        cueingReason,
      })
      toast({
        title: "Assistance Updated",
        description: "Assistance information added successfully.",
      })
      onClose()
    }
  }

  const filteredReasons = (reasons: string[]) =>
    reasons.filter((reason) => reason.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="flex flex-col h-[calc(100vh-100px)]">
      <div className="sticky top-0 bg-slate-900 p-4 z-10 border-b border-slate-700">
        <h2 className="text-xl font-semibold text-emerald-400 mb-4">Assistance</h2>
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-800 border-slate-700 text-slate-200"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 grid grid-cols-2 gap-4">
          <Card className="bg-slate-800 border-slate-700 p-4">
            <h3 className="text-sm font-medium text-emerald-400 mb-2">Assistance Level</h3>
            <RadioGroup value={assistanceLevel} onValueChange={setAssistanceLevel} className="grid grid-cols-2 gap-2">
              {assistanceLevels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={level}
                    id={level}
                    className="border-emerald-400 text-emerald-400 data-[state=checked]:bg-emerald-400 data-[state=checked]:text-slate-900"
                  />
                  <Label
                    htmlFor={level}
                    className="text-sm font-medium text-slate-200 cursor-pointer hover:text-emerald-400 transition-colors"
                  >
                    {level}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </Card>

          <Card className="bg-slate-800 border-slate-700 p-4">
            <h3 className="text-sm font-medium text-emerald-400 mb-2">Cueing Assistance</h3>
            <div className="flex space-x-4">
              <div className="flex-1 space-y-2">
                {["Verbal cues", "Visual cues", "Tactile cues", "Gestural cues", "Environmental cues"].map((cue) => (
                  <div key={cue} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cue-${cue}`}
                      checked={cueingAssistance.includes(cue)}
                      onCheckedChange={(checked) => {
                        setCueingAssistance((prev) => {
                          if (checked) {
                            if (prev.length >= 3) {
                              setError("You can select a maximum of 3 cueing assistance types")
                              return prev
                            }
                            return [...prev, cue]
                          }
                          return prev.filter((item) => item !== cue)
                        })
                      }}
                      className="border-emerald-400"
                    />
                    <Label
                      htmlFor={`cue-${cue}`}
                      className="text-sm font-medium text-slate-200 cursor-pointer hover:text-emerald-400 transition-colors"
                    >
                      {cue}
                    </Label>
                  </div>
                ))}
              </div>
              {cueingAssistance.length > 0 && (
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-slate-300 mb-2">Cueing Level</h4>
                  <RadioGroup value={cueingLevel} onValueChange={setCueingLevel} className="space-y-1">
                    {cueingLevels.map((level) => (
                      <div key={level} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={level}
                          id={`cueing-${level}`}
                          className="border-emerald-400 text-emerald-400 data-[state=checked]:bg-emerald-400 data-[state=checked]:text-slate-900"
                        />
                        <Label
                          htmlFor={`cueing-${level}`}
                          className="text-sm font-medium text-slate-200 cursor-pointer hover:text-emerald-400 transition-colors"
                        >
                          {level}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
            </div>
          </Card>

          <Card className="bg-slate-800 border-slate-700 p-4">
            <h3 className="text-sm font-medium text-emerald-400 mb-2">Reason for Assistance</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Select Reasons</Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-800 text-slate-100">
                <ScrollArea className="h-[60vh]">
                  <div className="space-y-4">
                    {Object.entries(reasonCategories).map(([categoryKey, category]) => (
                      <Card key={categoryKey} className="bg-slate-700 border-slate-600 p-2">
                        <h4 className="text-sm font-medium text-emerald-400 mb-2">{category.title}</h4>
                        {Object.entries(category.reasons).map(([subCategoryKey, reasons]) => (
                          <div key={subCategoryKey} className="mt-2">
                            <h5 className="text-xs font-medium text-slate-300 capitalize mb-1">{subCategoryKey}</h5>
                            {reasons.map((reason) => (
                              <div key={reason} className="flex items-center space-x-2 py-1">
                                <Checkbox
                                  id={reason}
                                  checked={selectedReasons.includes(reason)}
                                  onCheckedChange={(checked) => {
                                    setSelectedReasons((prev) => {
                                      if (checked) {
                                        if (prev.length >= 5) {
                                          setError("You can select a maximum of 5 reasons for assistance")
                                          return prev
                                        }
                                        return [...prev, reason]
                                      }
                                      return prev.filter((r) => r !== reason)
                                    })
                                  }}
                                  className="border-emerald-400"
                                />
                                <Label htmlFor={reason} className="text-xs text-slate-200 cursor-pointer">
                                  {reason}
                                </Label>
                              </div>
                            ))}
                          </div>
                        ))}
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
            <div className="mt-2">
              <Label className="text-xs font-medium text-slate-200">Selected Reasons:</Label>
              <ScrollArea className="h-[60px] mt-1">
                <ul className="list-disc list-inside">
                  {selectedReasons.map((reason) => (
                    <li key={reason} className="text-xs text-slate-300">
                      {reason}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
          </Card>

          <Card className="bg-slate-800 border-slate-700 p-4">
            <h3 className="text-sm font-medium text-emerald-400 mb-2">Reason for Cueing</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Select Cueing Reason</Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-800 text-slate-100">
                <ScrollArea className="h-[60vh]">
                  <div className="space-y-4">
                    {Object.entries(cueingReasons).map(([categoryKey, category]) => (
                      <Card key={categoryKey} className="bg-slate-700 border-slate-600 p-2">
                        <h4 className="text-sm font-medium text-emerald-400 mb-2">{category.title}</h4>
                        <div className="space-y-1">
                          {category.reasons.map((reason) => (
                            <div key={reason} className="flex items-center space-x-2">
                              <Checkbox
                                id={`cueing-${reason}`}
                                checked={cueingReason === reason}
                                onCheckedChange={(checked) => {
                                  if (checked) setCueingReason(reason)
                                  else if (cueingReason === reason) setCueingReason("")
                                }}
                                className="border-emerald-400"
                              />
                              <Label htmlFor={`cueing-${reason}`} className="text-xs text-slate-200 cursor-pointer">
                                {reason}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
            <div className="mt-2">
              <Label className="text-xs font-medium text-slate-200">Selected Cueing Reason:</Label>
              <p className="text-xs text-slate-300 mt-1">{cueingReason || "None selected"}</p>
            </div>
          </Card>
        </div>
      </div>
      {error && <ErrorMessage message={error} />}
      <div className="sticky bottom-0 bg-slate-900 p-4 border-t border-slate-700 flex justify-between items-center">
        <Button onClick={onClose} variant="outline">
          Cancel
        </Button>
        <Button
          onClick={handleAdd}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
          disabled={
            !assistanceLevel ||
            selectedReasons.length === 0 ||
            (cueingAssistance.length > 0 && (!cueingLevel || !cueingReason))
          }
        >
          Add to Assistance
        </Button>
      </div>
    </div>
  )
}

