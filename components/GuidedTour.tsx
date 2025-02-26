"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const tourSteps = [
  {
    title: "Welcome to Therapy Note Builder",
    content: "This tour will guide you through the main features of the application.",
  },
  {
    title: "Guided Process",
    content: "Follow the steps in the Guided Process to create a comprehensive therapy note.",
  },
  {
    title: "Quick Selection",
    content: "Use the Quick Selection panel to quickly add frequently used or recent items.",
  },
  {
    title: "Documentation Preview",
    content: "See a live preview of your documentation as you build it.",
  },
  {
    title: "Template Management",
    content: "Save and load templates to speed up your note-taking process.",
  },
]

export function GuidedTour() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenTour")
    if (!hasSeenTour) {
      setIsOpen(true)
    }
  }, [])

  const handleClose = () => {
    setIsOpen(false)
    localStorage.setItem("hasSeenTour", "true")
  }

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-slate-800 border-slate-700 text-slate-100">
        <DialogHeader>
          <DialogTitle className="text-emerald-400">{tourSteps[currentStep].title}</DialogTitle>
        </DialogHeader>
        <div className="py-4 text-slate-300">{tourSteps[currentStep].content}</div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} className="bg-slate-700 text-slate-200 hover:bg-slate-600">
            Skip Tour
          </Button>
          <Button onClick={handleNext} className="bg-emerald-600 text-white hover:bg-emerald-700">
            {currentStep === tourSteps.length - 1 ? "Finish" : "Next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

