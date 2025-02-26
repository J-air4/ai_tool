import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Filter } from "lucide-react"

interface FilterDropdownProps {
  onFilterChange: (filters: string[]) => void
}

export function FilterDropdown({ onFilterChange }: FilterDropdownProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const filters = [
    "Motor Control",
    "Cognitive",
    "ADL",
    "Balance",
    "Strength",
    "Coordination",
    "Endurance",
    "Mobility",
    "Self-Care",
    "Safety",
  ]

  const handleFilterChange = (filter: string) => {
    setActiveFilters((prev) => {
      const newFilters = prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
      onFilterChange(newFilters)
      return newFilters
    })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center">
          <Filter className="mr-2 h-4 w-4" />
          Filters ({activeFilters.length})
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 bg-slate-800 border-slate-700">
        <div className="grid grid-cols-2 gap-2">
          {filters.map((filter) => (
            <div key={filter} className="flex items-center">
              <Checkbox
                id={filter}
                checked={activeFilters.includes(filter)}
                onCheckedChange={() => handleFilterChange(filter)}
              />
              <label htmlFor={filter} className="ml-2 text-sm text-slate-200 cursor-pointer">
                {filter}
              </label>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}

