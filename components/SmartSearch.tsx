"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search } from "lucide-react"

interface SmartSearchProps {
  onSearch: (term: string) => void
  allSnippets: string[]
}

export function SmartSearch({ onSearch, allSnippets }: SmartSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    onSearch(term)

    if (term.length > 1) {
      const filteredSuggestions = allSnippets
        .filter((snippet) => snippet.toLowerCase().includes(term.toLowerCase()))
        .slice(0, 5)
      setSuggestions(filteredSuggestions)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion)
    onSearch(suggestion)
    setShowSuggestions(false)
  }

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex items-center">
        <Input
          type="text"
          placeholder="Search interventions..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-4 py-2 w-full bg-slate-700 border-slate-600 text-slate-200 rounded-md"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={() => handleSearch("")}
          >
            Clear
          </Button>
        )}
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-700 rounded-md shadow-lg">
          <ScrollArea className="max-h-60">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-start text-left px-4 py-2 hover:bg-slate-700"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </ScrollArea>
        </div>
      )}
    </div>
  )
}

