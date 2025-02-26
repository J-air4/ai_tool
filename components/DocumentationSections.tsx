import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface DocumentationSectionsProps {
  onSectionClick: (
    section: "purposeOfTreatment" | "intervention" | "assistance" | "observations" | "outcomes" | "plan",
  ) => void
  selectedSections: {
    purposeOfTreatment: string[]
    intervention: string[]
    assistance: string[]
    observations: string[]
    outcomes: string[]
    plan: string[]
  }
}

export default function DocumentationSections({ onSectionClick, selectedSections }: DocumentationSectionsProps) {
  const sections = [
    { id: "purposeOfTreatment", label: "Purpose of Treatment" },
    { id: "intervention", label: "Intervention" },
    { id: "assistance", label: "Assistance" },
    { id: "observations", label: "Observations" },
    { id: "outcomes", label: "Outcomes" },
    { id: "plan", label: "Plan" },
  ] as const

  return (
    <div className="space-y-2">
      {sections.map((section) => (
        <Button
          key={section.id}
          variant="ghost"
          className="w-full justify-between bg-slate-800 hover:bg-slate-700 text-left h-auto py-4"
          onClick={() => onSectionClick(section.id)}
          aria-label={`Open ${section.label} section`}
        >
          <span className="font-medium">{section.label}</span>
          <div className="flex items-center space-x-2">
            {selectedSections[section.id] && selectedSections[section.id].length > 0 && (
              <span className="text-sm text-emerald-400">{selectedSections[section.id].length} items</span>
            )}
            <ChevronRight className="h-4 w-4" />
          </div>
        </Button>
      ))}
    </div>
  )
}

