import { useState } from "react"
import PurposeOfTreatmentModal from "./PurposeOfTreatmentModal"
import InterventionModal from "./InterventionModal"
import AssistanceModal from "./AssistanceModal"
import ObservationsModal from "./ObservationsModal"
import OutcomesModal from "./OutcomesModal"
import PlanModal from "./PlanModal"
import MeasurableOutcomesModal from "./MeasurableOutcomesModal"
import { Button } from "@/components/ui/button"
import { ErrorMessage } from "./ErrorMessage"
import type { SelectedSections, ModalSelections } from "../types/therapyNoteBuilder"

interface StepContentProps {
  currentStep: string
  selectedSections: SelectedSections
  onUpdateSections: (sections: SelectedSections) => void
  onClose: () => void
  activeCategory: "self-care" | "therapeutic-activities"
  modalSelections: ModalSelections
  onModalSelectionUpdate: (modal: keyof ModalSelections, selections: any) => void
  selectedInterventions: string[]
  setSelectedInterventions: (interventions: string[]) => void
  onReturnToMainOutcomes: () => void
  onNextStep: () => void
  onPreviousStep: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

export function StepContent({
  currentStep,
  selectedSections,
  onUpdateSections,
  onClose,
  activeCategory,
  modalSelections,
  onModalSelectionUpdate,
  selectedInterventions,
  setSelectedInterventions,
  onReturnToMainOutcomes,
  onNextStep,
  onPreviousStep,
  isFirstStep,
  isLastStep,
}: StepContentProps) {
  const [error, setError] = useState<string | null>(null)

  const validateStep = () => {
    if (currentStep === "purposeOfTreatment" && selectedSections.purposeOfTreatment.length === 0) {
      setError("Please select at least one purpose of treatment")
      return false
    }
    if (currentStep === "intervention" && selectedSections.intervention.length === 0) {
      setError("Please select at least one intervention")
      return false
    }
    // Add more validation for other steps as needed
    setError(null)
    return true
  }

  const handleNextStep = () => {
    if (validateStep()) {
      onNextStep()
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case "purposeOfTreatment":
        return (
          <PurposeOfTreatmentModal
            selectedSections={selectedSections}
            onUpdateSections={onUpdateSections}
            onClose={onClose}
            selections={modalSelections.purposeOfTreatment}
            onSelectionsChange={(selections) => onModalSelectionUpdate("purposeOfTreatment", selections)}
          />
        )
      case "intervention":
        return (
          <InterventionModal
            selectedSections={selectedSections}
            onUpdateSections={onUpdateSections}
            onClose={onClose}
            activeCategory={activeCategory}
            selections={modalSelections.intervention}
            onSelectionsChange={(selections) => onModalSelectionUpdate("intervention", selections)}
            onInterventionsChange={setSelectedInterventions}
          />
        )
      case "assistance":
        return (
          <AssistanceModal
            selectedSections={selectedSections}
            onUpdateSections={onUpdateSections}
            onClose={onClose}
            selections={modalSelections.assistance}
            onSelectionsChange={(selections) => onModalSelectionUpdate("assistance", selections)}
          />
        )
      case "observations":
        return (
          <ObservationsModal
            selectedSections={selectedSections}
            onUpdateSections={onUpdateSections}
            onClose={onClose}
            selections={modalSelections.observations}
            onSelectionsChange={(selections) => onModalSelectionUpdate("observations", selections)}
          />
        )
      case "outcomes":
        return (
          <OutcomesModal
            selectedSections={selectedSections}
            onUpdateSections={onUpdateSections}
            onClose={onClose}
            onOpenMeasurableOutcomes={onReturnToMainOutcomes}
            selections={modalSelections.outcomes}
            onSelectionsChange={(selections) => onModalSelectionUpdate("outcomes", selections)}
          />
        )
      case "measurableOutcomes":
        return (
          <MeasurableOutcomesModal
            selectedSections={selectedSections}
            onUpdateSections={onUpdateSections}
            onClose={onClose}
            onReturnToMainOutcomes={onReturnToMainOutcomes}
          />
        )
      case "plan":
        return (
          <PlanModal
            selectedSections={selectedSections}
            onUpdateSections={onUpdateSections}
            onClose={onClose}
            selectedNoteType={activeCategory}
            selections={modalSelections.plan}
            onSelectionsChange={(selections) => onModalSelectionUpdate("plan", selections)}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto">{renderStepContent()}</div>
      {error && <ErrorMessage message={error} />}
      <div className="flex justify-between mt-4 pt-4 border-t border-slate-700">
        <Button onClick={onPreviousStep} disabled={isFirstStep} variant="outline">
          Previous
        </Button>
        <Button onClick={handleNextStep} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </div>
  )
}

