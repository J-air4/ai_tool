"use client"
import { Check, Info, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const steps = [
  { id: "purposeOfTreatment", label: "Purpose of Treatment" },
  { id: "interventions", label: "Interventions" },
  { id: "assistance", label: "Assistance" },
  { id: "observations", label: "Observations" },
  { id: "outcomes", label: "Outcomes" },
  { id: "plan", label: "Plan" },
]

function getStepDescription(stepId: string): string {
  switch (stepId) {
    case "purposeOfTreatment":
      return "Define the overall goals and objectives of the therapy session."
    case "interventions":
      return "Select specific activities and exercises for the patient."
    case "assistance":
      return "Specify the level and type of assistance provided during the session."
    case "observations":
      return "Record important observations about the patient's performance and progress."
    case "outcomes":
      return "Document the results and achievements of the therapy session."
    case "plan":
      return "Outline the next steps and future goals for the patient's therapy."
    default:
      return "No description available."
  }
}

interface GuidedProcessProps {
  currentStep: string
  completedSteps: string[]
  onStepChange: (step: string) => void
}

export function GuidedProcess({ currentStep, completedSteps, onStepChange }: GuidedProcessProps) {
  return (
    <TooltipProvider>
      <div className="relative">
        <div className="absolute left-0 top-2 h-[calc(100%-16px)] w-px bg-slate-700" aria-hidden="true" />
        <ol className="space-y-4">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id)
            const isCurrent = currentStep === step.id

            return (
              <li key={step.id} className="relative pl-8">
                <div
                  className={cn(
                    "absolute left-0 top-2 flex h-4 w-4 items-center justify-center rounded-full border",
                    isCompleted
                      ? "border-emerald-600 bg-emerald-600"
                      : isCurrent
                        ? "border-emerald-600"
                        : "border-slate-700 bg-slate-800",
                  )}
                  aria-hidden="true"
                >
                  {isCompleted && <Check className="h-2.5 w-2.5 text-white" />}
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    className={cn(
                      "text-sm font-medium flex items-center",
                      isCurrent ? "text-emerald-500" : isCompleted ? "text-slate-200" : "text-slate-400",
                    )}
                    onClick={() => onStepChange(step.id)}
                  >
                    {step.label}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="p-0">
                        <Info className="h-4 w-4" />
                        <span className="sr-only">More information about {step.label}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{getStepDescription(step.id)}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </TooltipProvider>
  )
}

