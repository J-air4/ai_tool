"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { SelectedSections } from "../types/therapyNoteBuilder"

interface Template {
  id: string
  name: string
  sections: SelectedSections
  createdAt: string
}

interface TemplateManagerProps {
  currentSections: SelectedSections
  onLoadTemplate: (template: SelectedSections) => void
}

export function TemplateManager({ currentSections, onLoadTemplate }: TemplateManagerProps) {
  const [templates, setTemplates] = useState<Template[]>([])
  const [newTemplateName, setNewTemplateName] = useState("")

  useEffect(() => {
    // Load templates from local storage
    const storedTemplates = localStorage.getItem("documentationTemplates")
    if (storedTemplates) {
      setTemplates(JSON.parse(storedTemplates))
    }
  }, [])

  const saveTemplate = () => {
    if (newTemplateName) {
      const newTemplate: Template = {
        id: Date.now().toString(),
        name: newTemplateName,
        sections: currentSections,
        createdAt: new Date().toISOString(),
      }
      const updatedTemplates = [...templates, newTemplate]
      setTemplates(updatedTemplates)
      localStorage.setItem("documentationTemplates", JSON.stringify(updatedTemplates))
      setNewTemplateName("")
    }
  }

  const loadTemplate = (template: Template) => {
    onLoadTemplate(template.sections)
  }

  const deleteTemplate = (id: string) => {
    const updatedTemplates = templates.filter((template) => template.id !== id)
    setTemplates(updatedTemplates)
    localStorage.setItem("documentationTemplates", JSON.stringify(updatedTemplates))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Manage Templates</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Template Manager</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="name"
              value={newTemplateName}
              onChange={(e) => setNewTemplateName(e.target.value)}
              className="col-span-3"
              placeholder="New template name"
            />
            <Button onClick={saveTemplate}>Save</Button>
          </div>
          <ScrollArea className="h-[200px]">
            {templates.map((template) => (
              <div key={template.id} className="flex justify-between items-center py-2">
                <span>{template.name}</span>
                <div>
                  <Button variant="ghost" onClick={() => loadTemplate(template)}>
                    Load
                  </Button>
                  <Button variant="ghost" onClick={() => deleteTemplate(template.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}

