export interface SelectedSections {
  purposeOfTreatment: string[]
  intervention: string[]
  assistance: string[]
  observations: string[]
  outcomes: string[]
  plan: string[]
}

export interface ModalSelections {
  purposeOfTreatment: string[]
  intervention: string[]
  assistance: {
    assistanceLevel: string
    selectedReasons: string[]
    cueingAssistance: string[]
    cueingLevel: string
    cueingReason: string
  }
  observations: string[]
  outcomes: {
    selectedOutcomeType: "Progress Indicators" | "Continuing Needs"
    selectedOutcome: string
    selectedComponent: string
    selectedPerformance: string
  }
  plan: string[]
}

export type ModalType = keyof SelectedSections | "measurableOutcomes" | null

