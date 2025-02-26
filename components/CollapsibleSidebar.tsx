"use client"
import { Button } from "@/components/ui/button"
import { FileText, Activity, HelpingHand, Eye, Target, Clipboard, ChevronLeft, ChevronRight } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CollapsibleSidebarProps {
  onSectionClick: (
    section: "intervention" | "assistance" | "observations" | "plan" | "purposeOfTreatment" | "outcomes",
  ) => void
  selectedSections: {
    intervention: string[]
    assistance: string[]
    observations: string[]
    plan: string[]
    purposeOfTreatment: string[]
    outcomes: string[]
  }
  isOpen: boolean
  onToggle: () => void
}

export function CollapsibleSidebar({ onSectionClick, selectedSections, isOpen, onToggle }: CollapsibleSidebarProps) {
  const sidebarItems = [
    { id: "purposeOfTreatment", label: "Purpose of Treatment", icon: FileText },
    { id: "intervention", label: "Interventions", icon: Activity },
    { id: "assistance", label: "Assistance", icon: HelpingHand },
    { id: "observations", label: "Observations", icon: Eye },
    { id: "outcomes", label: "Outcomes", icon: Target },
    { id: "plan", label: "Plan", icon: Clipboard },
  ]

  return (
    <TooltipProvider>
      <nav
        className={`fixed left-0 top-0 h-full bg-slate-800 transition-all duration-300 z-50 ${
          isOpen ? "w-64" : "w-16"
        }`}
        aria-label="Main navigation"
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-4"
          onClick={onToggle}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
        <ul className="p-4 space-y-4" role="list">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${isOpen ? "" : "px-2"}`}
                    onClick={() => onSectionClick(item.id as keyof typeof selectedSections)}
                    aria-label={item.label}
                  >
                    <item.icon className="h-5 w-5 mr-2" aria-hidden="true" />
                    {isOpen && <span>{item.label}</span>}
                  </Button>
                </TooltipTrigger>
                {!isOpen && (
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </li>
          ))}
        </ul>
      </nav>
    </TooltipProvider>
  )
}

