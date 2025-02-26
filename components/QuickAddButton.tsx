import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PlusCircle } from "lucide-react"

interface QuickAddButtonProps {
  onQuickAdd: (section: string, item: string) => void
}

export function QuickAddButton({ onQuickAdd }: QuickAddButtonProps) {
  const quickAddItems = [
    { section: "purposeOfTreatment", label: "Improve functional mobility" },
    { section: "intervention", label: "Gait training" },
    { section: "assistance", label: "Minimal assistance" },
    { section: "observations", label: "Improved balance" },
    { section: "outcomes", label: "Increased independence" },
    { section: "plan", label: "Continue with current interventions" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="fixed bottom-4 right-4 h-16 w-16 rounded-full shadow-lg">
          <PlusCircle className="h-8 w-8" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {quickAddItems.map((item, index) => (
          <DropdownMenuItem key={index} onClick={() => onQuickAdd(item.section, item.label)}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

