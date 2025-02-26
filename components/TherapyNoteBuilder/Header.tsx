"use client"

import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"

interface HeaderProps {
  isDarkMode: boolean
  setIsDarkMode: (isDark: boolean) => void
}

export function Header({ isDarkMode, setIsDarkMode }: HeaderProps) {
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(!isDarkMode)
  }, [isDarkMode, setIsDarkMode])

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
      <h1 className="text-2xl font-bold">Therapy Note Builder</h1>
      <Button
        variant="outline"
        size="icon"
        onClick={toggleDarkMode}
        className="bg-slate-800 border-slate-700"
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
      </Button>
    </div>
  )
}

