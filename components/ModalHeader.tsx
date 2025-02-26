import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ModalHeaderProps {
  title: string
  onClose: () => void
}

export function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-700">
      <h2 className="text-xl font-semibold text-emerald-400">{title}</h2>
      <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close modal">
        <X className="h-5 w-5" />
      </Button>
    </div>
  )
}

