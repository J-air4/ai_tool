import { useState } from "react"
import { Star } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface QuickSelectionPanelProps {
  favorites: string[]
  recentlyUsed: string[]
  onSelect: (snippet: string) => void
  onFavorite: (snippet: string) => void
  selectedContent: string[]
}

export function QuickSelectionPanel({
  favorites,
  recentlyUsed,
  onSelect,
  onFavorite,
  selectedContent,
}: QuickSelectionPanelProps) {
  const [activeTab, setActiveTab] = useState<"favorites" | "recent">("favorites")

  return (
    <div className="mb-4 bg-slate-800 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-emerald-400 mb-2">Quick Selection</h3>
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "favorites" | "recent")}>
        <TabsList className="grid w-full grid-cols-2 mb-2">
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="recent">Recently Used</TabsTrigger>
        </TabsList>
        <TabsContent value="favorites">
          <div className="flex flex-wrap gap-2">
            {favorites.map((snippet) => (
              <div
                key={snippet}
                className={`p-2 rounded-md cursor-pointer transition-colors flex items-center justify-between ${
                  selectedContent.includes(snippet)
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-700 text-slate-200 hover:bg-slate-600"
                }`}
                onClick={() => onSelect(snippet)}
              >
                <span className="text-sm">{snippet}</span>
                <Star
                  className={`h-4 w-4 cursor-pointer ${
                    favorites.includes(snippet) ? "text-yellow-400" : "text-slate-400"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onFavorite(snippet)
                  }}
                />
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="recent">
          <div className="flex flex-wrap gap-2">
            {recentlyUsed.map((snippet) => (
              <div
                key={snippet}
                className={`p-2 rounded-md cursor-pointer transition-colors ${
                  selectedContent.includes(snippet)
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-700 text-slate-200 hover:bg-slate-600"
                }`}
                onClick={() => onSelect(snippet)}
              >
                <span className="text-sm">{snippet}</span>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

