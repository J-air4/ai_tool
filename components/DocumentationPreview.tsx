import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DocumentationPreviewProps {
  preview: string
  isExpanded: boolean
}

export default function DocumentationPreview({ preview, isExpanded }: DocumentationPreviewProps) {
  return (
    <Card className="bg-card text-card-foreground border-border">
      <ScrollArea
        className={`${isExpanded ? "h-[300px]" : "h-[100px]"} p-4 transition-all duration-300`}
        aria-label="Documentation preview"
      >
        {preview ? (
          <>
            {preview.split("Plan for next session")[0].trim()}
            {preview.includes("Plan for next session") && (
              <>
                <strong className="block mt-2 mb-1 text-primary">Plan for next session:</strong>
                {preview.split("Plan for next session")[1]}
              </>
            )}
          </>
        ) : (
          <span aria-label="No content available">Skilled interventions focused on...</span>
        )}
      </ScrollArea>
    </Card>
  )
}

