"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import type { SelectedSections } from "../types/therapyNoteBuilder"

interface DashboardProps {
  selectedSections: SelectedSections
  onSectionClick: (section: keyof SelectedSections) => void
  className?: string
}

export function Dashboard({ selectedSections, onSectionClick, className }: DashboardProps) {
  const sections: Array<{ id: keyof SelectedSections; title: string }> = useMemo(
    () => [
      { id: "purposeOfTreatment", title: "Purpose of Treatment" },
      { id: "intervention", title: "Interventions" },
      { id: "assistance", title: "Assistance" },
      { id: "observations", title: "Observations" },
      { id: "outcomes", title: "Outcomes" },
      { id: "plan", title: "Plan" },
    ],
    [],
  )

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}
      role="region"
      aria-label="Documentation sections"
    >
      {sections.map((section) => (
        <Card key={section.id} className="bg-slate-800 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{section.title}</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="w-9 h-9 p-0"
              onClick={() => onSectionClick(section.id)}
              aria-label={`Add ${section.title}`}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{selectedSections[section.id].length}</div>
            <p className="text-xs text-slate-500">
              {selectedSections[section.id].length === 1 ? "Item" : "Items"} selected
            </p>
            {selectedSections[section.id].length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Preview:</h4>
                <p className="text-xs text-slate-400 line-clamp-3">{selectedSections[section.id].join(", ")}</p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

