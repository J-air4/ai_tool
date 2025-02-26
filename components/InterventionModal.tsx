"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRight, ChevronDown } from "lucide-react"
import {
  SelfCareCategory,
  selfCareInterventions,
  getSelfCareInterventions,
  getSelfCareSubcategories,
} from "../data/self-care-activities"
import { therapeuticInterventions, type TherapeuticCategory } from "../data/therapeutic-activities"
import { transferSnippets, transferModifiers } from "../data/interventions"
import { ModalHeader } from "./ModalHeader"
import { QuickSelectionPanel } from "./QuickSelectionPanel"
import { SmartSearch } from "./SmartSearch"
import { CategoryTabs } from "./CategoryTabs"
import { FilterDropdown } from "./FilterDropdown"
import { RelatedSnippets } from "./RelatedSnippets"
import { ErrorMessage } from "./ErrorMessage"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface InterventionModalProps {
  selectedSections: {
    intervention: string[]
    assistance: string[]
    observations: string[]
    plan: string[]
  }
  onUpdateSections: (sections: {
    intervention: string[]
    assistance: string[]
    observations: string[]
    plan: string[]
  }) => void
  onClose: () => void
  activeCategory: "self-care" | "therapeutic-activities"
  selections: string[]
  onSelectionsChange: (selections: string[]) => void
  onInterventionsChange: (interventions: string[]) => void
  initialCategory: string
  initialSubCategory: string
  selectedCategory: string
  selectedSubCategory: string
}

export default function InterventionModal({
  selectedSections,
  onUpdateSections,
  onClose,
  activeCategory,
  selections,
  onSelectionsChange,
  onInterventionsChange,
  initialCategory,
  initialSubCategory,
  selectedCategory,
  selectedSubCategory,
}: InterventionModalProps) {
  const [selectedContent, setSelectedContent] = useState<string[]>(selections)
  const [selectedCategoryState, setSelectedCategory] = useState<string>(selectedCategory || initialCategory || "")
  const [selectedSubCategoryState, setSelectedSubCategory] = useState<string>(
    selectedSubCategory || initialSubCategory || "",
  )
  const [availableSubCategories, setAvailableSubCategories] = useState<{ id: string; title: string }[]>([])
  const [availableInterventions, setAvailableInterventions] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [usageCounts, setUsageCounts] = useState<Record<string, number>>({})
  const [error, setError] = useState<string | null>(null)
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>([])

  const handleAdd = () => {
    if (selectedContent.length === 0) {
      setError("Please select at least one intervention")
      return
    }
    if (selectedContent.length > 10) {
      setError("Please select no more than 10 interventions")
      return
    }
    if (selectedContent.some((content) => content.length > 150)) {
      setError("Each selected intervention must be 150 characters or less")
      return
    }
    setError(null)
    const updatedUsageCounts = { ...usageCounts }
    selectedContent.forEach((content) => {
      updatedUsageCounts[content] = (updatedUsageCounts[content] || 0) + 1
    })
    setUsageCounts(updatedUsageCounts)

    onUpdateSections({
      ...selectedSections,
      intervention: [...selectedSections.intervention, ...selectedContent],
    })
    onSelectionsChange(selectedContent)
    onInterventionsChange(selectedContent)
    toast({
      title: "Interventions Updated",
      description: `${selectedContent.length} intervention(s) added successfully.`,
    })
    onClose()
  }

  const validateSelection = (content: string) => {
    if (selectedContent.length >= 10 && !selectedContent.includes(content)) {
      setError("You can select a maximum of 10 interventions")
      return false
    }
    setError(null)
    return true
  }

  const handleContentSelection = (content: string) => {
    if (validateSelection(content)) {
      setSelectedContent((prev) =>
        prev.includes(content) ? prev.filter((item) => item !== content) : [...prev, content],
      )
    }
  }

  const handleFavoriteToggle = (snippet: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(snippet)) {
        newFavorites.delete(snippet)
      } else {
        newFavorites.add(snippet)
      }
      return newFavorites
    })
  }

  const filterContent = useCallback(
    (content: string) => {
      const matchesSearch = content.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilters =
        activeFilters.length === 0 ||
        activeFilters.some((filter) => content.toLowerCase().includes(filter.toLowerCase()))
      return matchesSearch && matchesFilters
    },
    [searchTerm, activeFilters],
  )

  const sortedInterventions = useMemo(() => {
    return availableInterventions.sort((a, b) => {
      // Sort by usage count (descending)
      const usageCountDiff = (usageCounts[b] || 0) - (usageCounts[a] || 0)
      if (usageCountDiff !== 0) return usageCountDiff

      // If usage count is the same, sort alphabetically
      return a.localeCompare(b)
    })
  }, [availableInterventions, usageCounts])

  const renderCategoryList = () => {
    const categories =
      activeCategory === "self-care"
        ? Object.values(SelfCareCategory).map((category) => ({
            id: category,
            title: selfCareInterventions[category].title,
          }))
        : Object.entries({ ...therapeuticInterventions, transfers: transferSnippets }).map(([key, value]) => ({
            id: key,
            title: value.title,
          }))

    return (
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="space-y-2 p-2">
          {categories
            .filter((category) => filterContent(category.title))
            .map((category) => (
              <div key={category.id}>
                <Button
                  variant="ghost"
                  className="w-full justify-between text-left"
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setExpandedCategories((prev) => {
                      const newSet = new Set(prev)
                      if (newSet.has(category.id)) {
                        newSet.delete(category.id)
                      } else {
                        newSet.add(category.id)
                      }
                      return newSet
                    })
                  }}
                >
                  <span>{category.title}</span>
                  {expandedCategories.has(category.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
                {expandedCategories.has(category.id) && (
                  <div className="ml-4 mt-2 space-y-2">
                    {availableSubCategories.map((subCategory) => (
                      <Button
                        key={subCategory.id}
                        variant="ghost"
                        className={`w-full justify-start text-left text-sm ${
                          subCategory.id === selectedSubCategoryState ? "bg-emerald-600 text-white" : ""
                        }`}
                        onClick={() => setSelectedSubCategory(subCategory.id)}
                      >
                        {subCategory.title}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </ScrollArea>
    )
  }

  const renderSnippets = (snippets: { id: string; text: string }[]) => (
    <div className="grid grid-cols-1 gap-4">
      {snippets
        .filter((snippet) => filterContent(snippet.text))
        .map((snippet) => (
          <Button
            key={snippet.id}
            variant="ghost"
            className={`w-full justify-start text-left ${
              selectedContent.includes(snippet.text) ? "bg-emerald-600 text-white" : "text-slate-200 hover:bg-slate-600"
            }`}
            onClick={() => handleContentSelection(snippet.text)}
          >
            <p className="text-sm leading-tight">{snippet.text}</p>
          </Button>
        ))}
    </div>
  )

  const renderInterventions = () => {
    if (activeCategory === "self-care") {
      if (isSelfCareCategory(selectedCategoryState) && selectedSubCategoryState) {
        return renderSnippets(
          getSelfCareInterventions(selectedCategoryState, selectedSubCategoryState as any).map(
            (intervention, index) => ({
              id: `${selectedCategoryState}-${selectedSubCategoryState}-${index}`,
              text: intervention,
            }),
          ),
        )
      }
    } else if (activeCategory === "therapeutic-activities") {
      if (selectedCategoryState && selectedSubCategoryState) {
        return renderSnippets(
          sortedInterventions.map((intervention, index) => ({
            id: `intervention-${selectedCategoryState}-${selectedSubCategoryState}-${index}`,
            text: intervention,
          })),
        )
      }
    }
    return null
  }

  const renderTransferModifiers = () => {
    if (activeCategory === "therapeutic-activities" && selectedCategoryState === "transfers") {
      return (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 space-y-6">
          <h3 className="text-lg font-medium text-emerald-400">Transfer Modifiers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(transferModifiers).map(([key, values]) => (
              <div key={key} className="bg-slate-700 p-4 rounded-md">
                <h4 className="text-sm font-medium text-slate-300 mb-3 capitalize">{key}</h4>
                <div className="space-y-2">
                  {values.filter(filterContent).map((value, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded-md cursor-pointer transition-colors ${
                        selectedContent.includes(value)
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-600 text-slate-200 hover:bg-slate-500"
                      }`}
                      onClick={() => handleContentSelection(value)}
                    >
                      <p className="text-sm">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
    return null
  }

  useEffect(() => {
    if (selectedContent.length > 0) {
      setError(null)
    }
  }, [selectedContent])

  const isSelfCareCategory = useCallback((category: string): category is SelfCareCategory => {
    return Object.values(SelfCareCategory).includes(category as SelfCareCategory)
  }, [])

  useEffect(() => {
    if (selectedCategoryState) {
      if (activeCategory === "self-care" && isSelfCareCategory(selectedCategoryState)) {
        setAvailableSubCategories(getSelfCareSubcategories(selectedCategoryState))
      } else if (activeCategory === "therapeutic-activities") {
        const category = therapeuticInterventions[selectedCategoryState as TherapeuticCategory]
        if (category) {
          const subCategories = [
            ...Object.entries(category.categories).map(([key, value]) => ({ id: key, title: value.title })),
            { id: "analysis", title: "Analysis" },
            { id: "adaptations", title: "Adaptations" },
            { id: "compensatoryTechniques", title: "Compensatory Techniques" },
          ]
          setAvailableSubCategories(subCategories)
        } else {
          console.error(`Invalid category: ${selectedCategoryState}`)
          setAvailableSubCategories([])
        }
      }
    } else {
      setAvailableSubCategories([])
    }
    setSelectedSubCategory("")
  }, [selectedCategoryState, activeCategory, isSelfCareCategory])

  useEffect(() => {
    if (selectedCategoryState && selectedSubCategoryState) {
      if (activeCategory === "self-care" && isSelfCareCategory(selectedCategoryState)) {
        setAvailableInterventions(getSelfCareInterventions(selectedCategoryState, selectedSubCategoryState as any))
      } else if (activeCategory === "therapeutic-activities") {
        const category = therapeuticInterventions[selectedCategoryState as TherapeuticCategory]
        if (category) {
          if (selectedSubCategoryState in category.categories) {
            setAvailableInterventions(category.categories[selectedSubCategoryState].activities)
          } else if (selectedSubCategoryState in category) {
            setAvailableInterventions(category[selectedSubCategoryState as keyof typeof category] as string[])
          } else {
            setAvailableInterventions([])
          }
        } else {
          setAvailableInterventions([])
        }
      }
    } else {
      setAvailableInterventions([])
    }
  }, [selectedCategoryState, selectedSubCategoryState, activeCategory, isSelfCareCategory])

  useEffect(() => {
    setSelectedContent(selections)
  }, [selections])

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory)
    }
  }, [initialCategory])

  useEffect(() => {
    if (initialSubCategory) {
      setSelectedSubCategory(initialSubCategory)
    }
  }, [initialSubCategory])

  useEffect(() => {
    if (selectedCategory) {
      setSelectedCategory(selectedCategory)
      setExpandedCategories((prev) => new Set(prev).add(selectedCategory))
    }
  }, [selectedCategory])

  useEffect(() => {
    if (selectedSubCategory) {
      setSelectedSubCategory(selectedSubCategory)
    }
  }, [selectedSubCategory])

  return (
    <div className="flex flex-col h-full">
      <ModalHeader title="Interventions" onClose={onClose} />
      <Tabs defaultValue="categories" className="flex-grow flex flex-col">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="search">Search</TabsTrigger>
          <TabsTrigger value="selected">Selected</TabsTrigger>
        </TabsList>
        <div className="flex-grow overflow-hidden flex mt-4">
          <TabsContent value="categories" className="flex-grow flex">
            <div className="w-1/3 overflow-y-auto border-r border-slate-700 pr-4">
              <CategoryTabs
                categories={
                  activeCategory === "self-care"
                    ? Object.values(SelfCareCategory)
                    : (Object.keys(therapeuticInterventions) as TherapeuticCategory[])
                }
                activeCategory={selectedCategoryState}
                onCategoryChange={setSelectedCategory}
              />
              {renderCategoryList()}
            </div>
            <div className="w-2/3 overflow-y-auto pl-4">
              <Card className="bg-slate-800 border-slate-700">
                <ScrollArea className="h-[calc(100vh-300px)]">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-emerald-400 mb-6">
                      {selectedCategoryState
                        ? activeCategory === "self-care"
                          ? selfCareInterventions[selectedCategoryState as SelfCareCategory]?.title
                          : therapeuticInterventions[selectedCategoryState as keyof typeof therapeuticInterventions]
                              ?.title
                        : "Select a category"}
                    </h3>
                    <div className="space-y-6">
                      {renderInterventions()}
                      {renderTransferModifiers()}
                    </div>
                  </div>
                </ScrollArea>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="search" className="flex-grow overflow-y-auto">
            <div className="mb-4">
              <SmartSearch onSearch={setSearchTerm} allSnippets={availableInterventions} />
              <FilterDropdown onFilterChange={setActiveFilters} />
            </div>
            {renderInterventions()}
          </TabsContent>
          <TabsContent value="selected" className="flex-grow overflow-y-auto">
            <Card className="bg-slate-800 border-slate-700">
              <div className="p-4">
                <h3 className="text-lg font-medium text-emerald-400 mb-4">Selected Content</h3>
                <ScrollArea className="h-[calc(100vh-300px)]">
                  <div className="space-y-2">
                    {selectedContent.map((content) => (
                      <div key={content} className="text-sm text-slate-300">
                        {content}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
      <div className="mt-4">
        <QuickSelectionPanel
          favorites={Array.from(favorites)}
          recentlyUsed={recentlyUsed}
          onSelect={handleContentSelection}
          onFavorite={handleFavoriteToggle}
          selectedContent={selectedContent}
        />
        <RelatedSnippets
          selectedSnippets={selectedContent}
          allSnippets={availableInterventions}
          onSelect={handleContentSelection}
          selectedContent={selectedContent}
        />
      </div>
      {error && <ErrorMessage message={error} />}
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-slate-300">
          {selectedContent.length} item{selectedContent.length !== 1 ? "s" : ""} selected
        </div>
        <Button
          onClick={handleAdd}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
          disabled={selectedContent.length === 0 || selectedContent.length > 10}
        >
          Add to Intervention
        </Button>
      </div>
    </div>
  )
}

