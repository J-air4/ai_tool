"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { X, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"
import DocumentationPreview from "./DocumentationPreview"
import { KeyboardShortcuts, KeyboardShortcutsModal } from "./KeyboardShortcuts"
import { StepContent } from "./StepContent"
import type { SelectedSections, ModalType } from "../types/therapyNoteBuilder"
import { Header } from "./TherapyNoteBuilder/Header"
import { Footer } from "./TherapyNoteBuilder/Footer"
import { QuickAddButton } from "./QuickAddButton"
import { CollapsibleSidebar } from "./CollapsibleSidebar"
import { GuidedProcess } from "./GuidedProcess"
import { TemplateManager } from "./TemplateManager"
import { LoadingSpinner } from "./LoadingSpinner"
import MeasurableOutcomesModal from "./MeasurableOutcomesModal"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { validateNoteName, validateNoteContent } from "../utils/validation"
import ErrorBoundary from "./ErrorBoundary"
import { sanitizeInput } from "../utils/sanitization"
import { saveNote, getNote, getAllNotes } from "../utils/indexedDB"
import { GuidedTour } from "./GuidedTour"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const steps = ["purposeOfTreatment", "interventions", "assistance", "observations", "outcomes", "plan"]

const MAX_SECTIONS = {
  purposeOfTreatment: 5,
  intervention: 10,
  assistance: 5,
  observations: 15,
  outcomes: 10,
  plan: 10,
}

type ModalSelections = {
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
    selectedOutcomeType: string
    selectedOutcome: string
    selectedComponent: string
    selectedPerformance: string
  }
  plan: string[]
}

export default function TherapyNoteBuilder() {
  const [currentModal, setCurrentModal] = useState<ModalType>(null)
  const [activeCategory, setActiveCategory] = useState<"self-care" | "therapeutic-activities">("self-care")
  const [selectedSections, setSelectedSections] = useState<SelectedSections>({
    purposeOfTreatment: [],
    intervention: [],
    assistance: [],
    observations: [],
    outcomes: [],
    plan: [],
  })
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true)
  const [sectionOrder, setSectionOrder] = useState<Array<keyof typeof selectedSections>>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
  const [showMeasurableOutcomes, setShowMeasurableOutcomes] = useState<boolean>(false)
  const { toast } = useToast()
  const [noteId, setNoteId] = useState<string | null>(null)
  const [savedNotes, setSavedNotes] = useState<Array<{ id: string; name: string }>>([])
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [showLoadDialog, setShowLoadDialog] = useState(false)
  const [noteName, setNoteName] = useState("")
  const [globalError, setGlobalError] = useState<string | null>(null)
  const [modalSelections, setModalSelections] = useState<ModalSelections>({
    purposeOfTreatment: [],
    intervention: [],
    assistance: {
      assistanceLevel: "",
      selectedReasons: [],
      cueingAssistance: [],
      cueingLevel: "",
      cueingReason: "",
    },
    observations: [],
    outcomes: {
      selectedOutcomeType: "Progress Indicators",
      selectedOutcome: "",
      selectedComponent: "",
      selectedPerformance: "",
    },
    plan: [],
  })
  const [selectedInterventions, setSelectedInterventions] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState<string>("purposeOfTreatment")
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("")

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  const handleStepChange = (step: string) => {
    setCurrentStep(step)
    setCurrentModal(step as ModalType)
  }

  const handleNextStep = () => {
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      handleStepChange(steps[currentIndex + 1])
    }
  }

  const handlePreviousStep = () => {
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      handleStepChange(steps[currentIndex - 1])
    }
  }

  const handleSectionClick = (section: keyof typeof selectedSections) => {
    setCurrentModal(section)
    setCurrentStep(section)
    setSectionOrder((prevOrder) => {
      if (!prevOrder.includes(section)) {
        return [...prevOrder, section]
      }
      return prevOrder
    })

    if (section === "intervention") {
      setSelectedCategory(selectedCategory || "")
      setSelectedSubCategory(selectedSubCategory || "")
    }
  }

  const handleModalSelectionUpdate = (modal: keyof typeof modalSelections, selections: any) => {
    setModalSelections((prev) => ({
      ...prev,
      [modal]: selections,
    }))
  }

  const validateSectionUpdate = useCallback((section: keyof typeof selectedSections, newContent: string[]) => {
    if (newContent.length > MAX_SECTIONS[section]) {
      setGlobalError(`You can add a maximum of ${MAX_SECTIONS[section]} items to the ${section} section.`)
      return false
    }
    setGlobalError(null)
    return true
  }, [])

  const handleUpdateSections = useCallback(
    (sections: SelectedSections) => {
      const isValid = Object.entries(sections).every(([key, value]) =>
        validateSectionUpdate(key as keyof SelectedSections, value),
      )

      if (isValid) {
        setSelectedSections(sections)
        const newCompletedSteps = Object.entries(sections)
          .filter(([_, value]) => value.length > 0)
          .map(([key]) => key)
        setCompletedSteps(newCompletedSteps)
      }
    },
    [validateSectionUpdate],
  )

  const preview = useMemo(
    () => sectionOrder.map((section) => selectedSections[section].join(" ")).join(" "),
    [sectionOrder, selectedSections],
  )

  const handleClearAll = () => {
    setSelectedSections({
      purposeOfTreatment: [],
      intervention: [],
      assistance: [],
      observations: [],
      outcomes: [],
      plan: [],
    })
    setSectionOrder([])
    setModalSelections({
      purposeOfTreatment: [],
      intervention: [],
      assistance: {
        assistanceLevel: "",
        selectedReasons: [],
        cueingAssistance: [],
        cueingLevel: "",
        cueingReason: "",
      },
      observations: [],
      outcomes: {
        selectedOutcomeType: "Progress Indicators",
        selectedOutcome: "",
        selectedComponent: "",
        selectedPerformance: "",
      },
      plan: [],
    })
    setSelectedInterventions([])
    setCompletedSteps([])
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(preview)
  }

  const handleSave = () => {
    setShowSaveDialog(true)
  }

  const handleSaveConfirm = async () => {
    const sanitizedNoteName = sanitizeInput(noteName)
    if (!validateNoteName(sanitizedNoteName)) {
      toast({
        title: "Error",
        description: "Please enter a valid name for your note (1-50 characters)",
        variant: "destructive",
      })
      return
    }

    const noteContent = JSON.stringify(selectedSections)
    if (!validateNoteContent(noteContent)) {
      toast({
        title: "Error",
        description: "The note content is invalid or too large",
        variant: "destructive",
      })
      return
    }

    const noteId = noteId || Date.now().toString()
    const note = {
      id: noteId,
      name: sanitizedNoteName,
      sections: selectedSections,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    try {
      await saveNote(note)
      setNoteId(noteId)
      setSavedNotes((prev) => [...prev, { id: noteId, name: sanitizedNoteName }])
      setShowSaveDialog(false)
      setNoteName("")

      toast({
        title: "Note saved successfully",
        description: `Note "${sanitizedNoteName}" has been saved`,
      })
    } catch (error) {
      console.error("Error saving note:", error)
      toast({
        title: "Error saving note",
        description: "An error occurred while saving the note. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleLoad = () => {
    setShowLoadDialog(true)
  }

  const handleLoadConfirm = async (id: string) => {
    try {
      const note = await getNote(id)
      if (note) {
        if (!validateNoteContent(JSON.stringify(note.sections))) {
          throw new Error("Invalid note content")
        }
        setSelectedSections(note.sections)
        setNoteId(id)
        setShowLoadDialog(false)
        toast({
          title: "Note loaded successfully",
          description: `Note "${note.name}" has been loaded`,
        })
      } else {
        throw new Error("Note not found")
      }
    } catch (error) {
      console.error("Error loading note:", error)
      toast({
        title: "Error loading note",
        description: "The selected note could not be loaded. It may be corrupted or invalid.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    const loadSavedNotes = async () => {
      try {
        const notes = await getAllNotes()
        setSavedNotes(notes.map((note) => ({ id: note.id, name: note.name })))
      } catch (error) {
        console.error("Error loading saved notes:", error)
        toast({
          title: "Error",
          description: "Failed to load saved notes. Please try again later.",
          variant: "destructive",
        })
      }
    }

    loadSavedNotes()
  }, [toast])

  const handleReturnToMainOutcomes = () => {
    setCurrentModal("outcomes")
  }

  const handleQuickAdd = (section: keyof SelectedSections, item: string) => {
    setSelectedSections((prev) => ({
      ...prev,
      [section]: [...prev[section], item],
    }))
  }

  const handleLoadTemplate = (template: SelectedSections) => {
    setSelectedSections(template)
    setSectionOrder(Object.keys(template) as Array<keyof typeof selectedSections>)
    setCompletedSteps(Object.keys(template).filter((key) => template[key as keyof SelectedSections].length > 0))
  }

  const handleOpenMeasurableOutcomes = () => {
    setShowMeasurableOutcomes(true)
  }

  const handleCloseMeasurableOutcomes = () => {
    setShowMeasurableOutcomes(false)
  }

  return (
    <ErrorBoundary>
      <div
        className={`min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 ${
          isDarkMode ? "dark" : ""
        }`}
      >
        <KeyboardShortcuts
          onCopyToClipboard={handleCopyToClipboard}
          onClearAll={handleClearAll}
          onOpenPurposeOfTreatment={() => handleSectionClick("purposeOfTreatment")}
          onOpenIntervention={() => handleSectionClick("intervention")}
          onOpenAssistance={() => handleSectionClick("assistance")}
          onOpenObservations={() => handleSectionClick("observations")}
          onOpenPlan={() => handleSectionClick("plan")}
          onOpenOutcomes={() => handleSectionClick("outcomes")}
        />
        <GuidedTour />
        <div className="flex">
          <CollapsibleSidebar
            onSectionClick={handleSectionClick}
            selectedSections={selectedSections}
            isOpen={isSidebarOpen}
            onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Navigation sidebar"
          />
          <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-16"}`}>
            <div className="max-w-7xl mx-auto space-y-6 p-4 sm:p-6">
              <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
              <Tabs
                defaultValue={activeCategory}
                onValueChange={(value) => setActiveCategory(value as "self-care" | "therapeutic-activities")}
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="self-care">Self-Care</TabsTrigger>
                  <TabsTrigger value="therapeutic-activities">Therapeutic Activities</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="flex justify-between items-center">
                <KeyboardShortcutsModal />
                <TemplateManager
                  currentSections={selectedSections}
                  onLoadTemplate={handleLoadTemplate}
                  aria-label="Template management"
                />
              </div>
              {globalError && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                  role="alert"
                >
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <span className="block sm:inline">{globalError}</span>
                  </div>
                </div>
              )}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-semibold text-emerald-400">Documentation Preview</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
                    aria-label={isPreviewExpanded ? "Collapse preview" : "Expand preview"}
                  >
                    {isPreviewExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                </div>
                <DocumentationPreview
                  preview={preview}
                  isExpanded={isPreviewExpanded}
                  aria-label="Documentation preview"
                />
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start mb-4 space-y-4 md:space-y-0 md:space-x-4">
                <div className="w-full md:w-3/4">
                  <GuidedProcess
                    currentStep={currentStep}
                    completedSteps={completedSteps}
                    onStepChange={handleStepChange}
                    aria-label="Guided process steps"
                  />
                </div>
              </div>
              <Footer
                onClearAll={handleClearAll}
                onCopyToClipboard={handleCopyToClipboard}
                preview={preview}
                onSave={handleSave}
                onLoad={handleLoad}
              />
            </div>
          </div>
        </div>
        <QuickAddButton onQuickAdd={handleQuickAdd} aria-label="Quick add button" />
        {isLoading && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            aria-live="polite"
            aria-busy="true"
          >
            <LoadingSpinner />
            <span className="sr-only">Loading...</span>
          </div>
        )}
        <Dialog open={currentModal !== null} onOpenChange={() => setCurrentModal(null)} aria-label="Section content">
          <DialogContent className="sm:max-w-[90vw] md:max-w-[900px] w-full h-[90vh] max-h-[600px] bg-slate-800 text-slate-100 overflow-hidden">
            <div className="h-full flex flex-col">
              <button
                onClick={() => setCurrentModal(null)}
                className="absolute right-4 top-4 text-slate-400 hover:text-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex-grow overflow-y-auto">
                <StepContent
                  currentStep={currentStep}
                  selectedSections={selectedSections}
                  onUpdateSections={handleUpdateSections}
                  onClose={() => setCurrentModal(null)}
                  activeCategory={activeCategory}
                  modalSelections={modalSelections}
                  onModalSelectionUpdate={handleModalSelectionUpdate}
                  selectedInterventions={selectedInterventions}
                  setSelectedInterventions={setSelectedInterventions}
                  onReturnToMainOutcomes={handleReturnToMainOutcomes}
                  onNextStep={handleNextStep}
                  onPreviousStep={handlePreviousStep}
                  isFirstStep={currentStep === steps[0]}
                  isLastStep={currentStep === steps[steps.length - 1]}
                  selectedCategory={selectedCategory}
                  selectedSubCategory={selectedSubCategory}
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog} aria-label="Save note">
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save Note</DialogTitle>
            </DialogHeader>
            <Input placeholder="Enter note name" value={noteName} onChange={(e) => setNoteName(e.target.value)} />
            <DialogFooter>
              <Button onClick={() => setShowSaveDialog(false)}>Cancel</Button>
              <Button onClick={handleSaveConfirm}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showLoadDialog} onOpenChange={setShowLoadDialog} aria-label="Load note">
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Load Note</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              {savedNotes.map((note) => (
                <Button key={note.id} onClick={() => handleLoadConfirm(note.id)} className="w-full justify-start">
                  {note.name}
                </Button>
              ))}
            </div>
            <DialogFooter>
              <Button onClick={() => setShowLoadDialog(false)}>Cancel</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {showMeasurableOutcomes && (
          <MeasurableOutcomesModal
            selectedSections={selectedSections}
            onUpdateSections={handleUpdateSections}
            onClose={handleCloseMeasurableOutcomes}
            onReturnToMainOutcomes={() => {
              handleCloseMeasurableOutcomes()
              setCurrentModal("outcomes")
            }}
          />
        )}
        <Toaster />
      </div>
    </ErrorBoundary>
  )
}

